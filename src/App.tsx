import { useState, useCallback } from 'react'
import { Shield, BarChart3, Table2, FileText, Settings, Printer, Pencil, Check } from 'lucide-react'
import Phase1 from './pages/Phase1'
import Phase2 from './pages/Phase2'
import Phase3 from './pages/Phase3'
import Phase4 from './pages/Phase4'

export default function App() {
  const [currentPhase, setCurrentPhase] = useState(1)
  const [isEditing, setIsEditing] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const switchPhase = useCallback((n: number) => {
    setCurrentPhase(n)
    if (n !== 2) setIsEditing(false)
    setRefreshKey(k => k + 1)
  }, [])

  const toggleEdit = () => setIsEditing(v => !v)
  const handlePrint = () => window.print()

  const phases = [
    { id: 1, label: 'Dashboard', icon: BarChart3 },
    { id: 2, label: 'Records', icon: Table2 },
    { id: 3, label: 'SOA / Payroll', icon: FileText },
    { id: 4, label: 'Settings', icon: Settings },
  ]

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-brand">
          <Shield size={24} className="text-sky-400" />
          <h1>7J<span>&</span>Tech</h1>
          <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: 8 }}>
            Dental Dashboard
          </span>
        </div>

        <div className="phase-tabs">
          {phases.map(p => (
            <button
              key={p.id}
              className={`phase-tab ${currentPhase === p.id ? 'active' : ''}`}
              onClick={() => switchPhase(p.id)}
            >
              <p.icon size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              {p.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {currentPhase === 2 && (
            <button
              className={`edit-toggle ${isEditing ? 'active' : ''}`}
              onClick={toggleEdit}
            >
              {isEditing ? <Check size={14} /> : <Pencil size={14} />}
              {isEditing ? ' Done' : ' Edit'}
            </button>
          )}
          <button className="print-btn" onClick={handlePrint}>
            <Printer size={14} />
          </button>
        </div>
      </header>

      <main className="phase-content" key={refreshKey}>
        {currentPhase === 1 && <Phase1 />}
        {currentPhase === 2 && <Phase2 isEditing={isEditing} />}
        {currentPhase === 3 && <Phase3 />}
        {currentPhase === 4 && <Phase4 />}
      </main>
    </div>
  )
}
