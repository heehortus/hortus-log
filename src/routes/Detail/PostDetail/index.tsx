import React from "react"
import PostBack from "./PostBack"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import PostTable from "./PostTable"

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()

  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined

  const hasHeadings = Object.values(data.recordMap.block).some(
    (block) =>
      ["header", "sub_header", "sub_sub_header"].includes(
        block.value?.type || ""
      )
  )

  return (
    <StyledWrapper>
      <article>
        {data.type[0] === "Post" && <PostBack />}
        {category && (
          <div css={{ marginBottom: "0.5rem" }}>
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
            </Category>
          </div>
        )}
        {data.type[0] === "Post" && <PostHeader data={data} />}
        <div>
          <NotionRenderer recordMap={data.recordMap} />
        </div>
        {data.type[0] === "Post" && (
          <>
            <Footer />
            <CommentBox data={data} />
          </>
        )}
      </article>
      {data.type[0] === "Post" && hasHeadings && (
        <aside>
          <PostTable recordMap={data.recordMap} />
        </aside>
      )}
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  position: relative;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 1.5rem;
  max-width: 56rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: 0 auto;

  > article {
    margin: 0 auto;
    max-width: 42rem;
  }

  > aside {
    display: none;
    @media (min-width: 1300px) {
      display: block;
      position: absolute;
      top: 3rem;
      left: calc(100% + 2rem);
      width: 14rem;
    }
  }
`