import styled from "@emotion/styled"
import { ExtendedRecordMap } from "notion-types"
import React, { useEffect, useState } from "react"

type Heading = {
  id: string
  text: string
  level: number
}

type Props = {
  recordMap: ExtendedRecordMap
}

const TableOfContents: React.FC<Props> = ({ recordMap }) => {
  const [activeId, setActiveId] = useState<string>("")

  const headings: Heading[] = Object.entries(recordMap.block)
    .filter(([, block]) =>
      ["header", "sub_header", "sub_sub_header"].includes(
        block.value?.type || ""
      )
    )
    .map(([id, block]) => ({
      id,
      text: block.value?.properties?.title?.[0]?.[0] || "",
      level:
        block.value?.type === "header"
          ? 1
          : block.value?.type === "sub_header"
          ? 2
          : 3,
    }))
    .filter((h) => h.text)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  return (
    <StyledWrapper>
      <div className="title">목차</div>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id.replace(/-/g, "")}`}
          className={`item level-${heading.level} ${
            activeId === heading.id ? "active" : ""
          }`}
        >
          {heading.text}
        </a>
      ))}
    </StyledWrapper>
  )
}

export default TableOfContents

const StyledWrapper = styled.div`
  position: fixed;
  top: 5rem;
  width: 14rem;
  padding: 1rem;
  border-left: 2px solid ${({ theme }) => theme.colors.gray4};
  font-size: 0.875rem;

  .title {
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.gray12};
  }

  .item {
    display: block;
    padding: 0.25rem 0;
    color: ${({ theme }) => theme.colors.gray10};
    cursor: pointer;
    transition: color 0.2s ease;
    :hover {
      color: ${({ theme }) => theme.colors.gray12};
    }
    &.active {
      color: ${({ theme }) => theme.colors.gray12};
      font-weight: 700;
    }
  }

  .level-1 { padding-left: 0; }
  .level-2 { padding-left: 1rem; }
  .level-3 { padding-left: 2rem; }
`