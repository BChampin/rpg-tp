import { createContext, useContext, useEffect, useState } from 'react'
import { TpData } from '@/types'


// Context defaults
const RpgTpContext = createContext<TpData | null>(null)

export function RpgTpProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TpData | null>(null)

  useEffect(() => {
    fetch("/json/rpg_tp.json") // Loads from public folder
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load data:", err))
  }, [])

  return <RpgTpContext.Provider value={data}>{children}</RpgTpContext.Provider>
}

// Custom hook for easier access
// eslint-disable-next-line react-refresh/only-export-components
export function useRpgTp() {
  return useContext(RpgTpContext)
}
