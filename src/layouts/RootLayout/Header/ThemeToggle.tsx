import styled from "@emotion/styled"
import React from "react"
import { Emoji } from "src/components/Emoji"
import useScheme from "src/hooks/useScheme"

type Props = {}

const ThemeToggle: React.FC<Props> = () => {
  const [scheme, setScheme] = useScheme()

  const handleClick = (e: React.MouseEvent) => {
    const x = e.clientX
    const y = e.clientY
    const newScheme = scheme === "light" ? "dark" : "light"

    const doc = document as any

    if (!doc.startViewTransition) {
      setScheme(newScheme)
      return
    }

    document.documentElement.style.setProperty("--x", `${x}px`)
    document.documentElement.style.setProperty("--y", `${y}px`)

    doc.startViewTransition(() => {
      setScheme(newScheme)
    })
  }

  return (
    <StyledWrapper onClick={(e) => handleClick(e)}>
      <Emoji>{scheme === "light" ? "☀️" : "🌙"}</Emoji>
    </StyledWrapper>
  )
}

export default ThemeToggle

const StyledWrapper = styled.div`
  cursor: pointer;
`