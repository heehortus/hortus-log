import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ProgressBar = () => {
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const isPost = router.pathname.startsWith("/[slug]")

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = (scrollTop / docHeight) * 100
      setProgress(percent)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isPost) return null

  return <StyledWrapper style={{ width: `${progress}%` }} />
}

export default ProgressBar

const StyledWrapper = styled.div`
  height: 3px;
  background-color: ${({ theme }) => theme.colors.green9};
  transition: width 0.1s ease;
`