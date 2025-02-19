import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { RpgTpProvider } from '@/hooks/useRpgTp'
import { SettingsProvider } from '@/hooks/useSettings'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <SettingsProvider>
      <RpgTpProvider>
        <RouterProvider router={router} />
      </RpgTpProvider>
    </SettingsProvider>
  </StrictMode>,
)
