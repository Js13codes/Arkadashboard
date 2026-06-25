import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import StartupLoader from './components/StartupLoader'
import App from './App'

function Root() {
  const [unlocked, setUnlocked] = useState(false)

  if (!unlocked) {
    return <StartupLoader onUnlock={() => setUnlocked(true)} />
  }

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
