import { useState } from 'react'
import { Eye, EyeOff, Lock, Unlock } from 'lucide-react'

interface Props {
  children: React.ReactNode
  requiredRole?: 'admin' | 'dentist' | 'assistant'
  title?: string
}

export default function HiddenPanel({ children, requiredRole = 'admin', title = 'Restricted Data' }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLocked, setIsLocked] = useState(true)

  const toggleVisibility = () => {
    if (isLocked) {
      const pin = prompt('Enter admin PIN to unlock:')
      if (pin === '7JTECH2026') {
        setIsLocked(false)
        setIsVisible(true)
      } else {
        alert('Incorrect PIN')
      }
    } else {
      setIsVisible(!isVisible)
    }
  }

  return (
    <div className="hidden-panel-wrapper">
      <div className="hidden-panel-header" onClick={toggleVisibility}>
        {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
        <span>{title}</span>
        {isLocked ? <Lock size={14} className="lock-icon" /> : <Unlock size={14} className="unlock-icon" />}
      </div>

      {isVisible && (
        <div className="hidden-panel-content" data-role={requiredRole}>
          <div className="panel-watermark">CONFIDENTIAL</div>
          {children}
        </div>
      )}
    </div>
  )
}
