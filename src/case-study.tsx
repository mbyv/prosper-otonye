import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import './styles.css'
import CaseStudy from './CaseStudy'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CaseStudy />
  </StrictMode>,
)
