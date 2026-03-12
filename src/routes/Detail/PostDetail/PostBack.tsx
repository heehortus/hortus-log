import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type Props = {}

const PostBack: React.FC<Props> = () => {
  const router = useRouter()
  return (
    <StyledWrapper>
      <a onClick={() => router.push("/")}>← Back</a>
    </StyledWrapper>
  )
}

export default PostBack

const StyledWrapper = styled.div`
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.gray10};
  a {
    margin-bottom: 1rem;
    display: block;
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.colors.gray12};
    }
  }
`