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

    if (!document.startViewTransition) {
      setScheme(newScheme)
      return
    }
    
    document.documentElement.style.setProperty("---x", `${x}px`)
    document.documentElement.style.setProperty("--y", `${y}px`)

    document.startViewTransition(() => {
      setScheme(newScheme)
    })
  }

  return (
    <StyledWrapper onClick={handleClick}>
      <Emoji>{scheme === "light" ? "☀️" : "🌙"}</Emoji>
    </StyledWrapper>
  )
}

export default ThemeToggle

const StyledWrapper = styled.div`
  cursor: pointer;
`
