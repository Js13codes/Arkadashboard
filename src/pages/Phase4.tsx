import { useState } from 'react'
import { DataStore } from '../stores/DataStore'
import { Database, Trash2, AlertTriangle } from 'lucide-react'

export default function Phase4() {
  const [showReset, setShowReset] = useState(false)

  const handleReset = () => {
    if (confirm('WARNING: This will delete ALL data. Are you sure?')) {
      localStorage.removeItem('dentalData')
      window.location.reload()
    }
  }

  const handleExport = () => {
    const data = {
      income: DataStore.income,
      expenses: DataStore.expenses,
      attendance: DataStore.attendance,
      leaves: DataStore.leaves,
      exportedAt: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dental-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div id="phase4" className="phase active">
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Income Records</div>
          <div className="kpi-value">{DataStore.income.length}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Expense Records</div>
          <div className="kpi-value">{DataStore.expenses.length}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Employees</div>
          <div className="kpi-value">6</div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3><Database size={16} style={{ verticalAlign: 'middle', marginRight: 8 }} /> Data Management</h3>
        </div>
        <div style={{ padding: 24 }}>
          <button className="btn btn-primary" onClick={handleExport} style={{ marginRight: 12 }}>
            Export All Data (JSON)
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setShowReset(true)}
            style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444' }}
          >
            <Trash2 size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Reset All Data
          </button>

          {showReset && (
            <div style={{
              marginTop: 20, padding: 16, background: 'rgba(239,68,68,0.08)',
              border: '1px solid #ef4444', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12
            }}>
              <AlertTriangle size={20} color="#ef4444" />
              <div style={{ flex: 1 }}>
                <p style={{ color: '#ef4444', fontWeight: 600, margin: 0 }}>This action cannot be undone!</p>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '4px 0 0' }}>All income, expenses, and attendance data will be permanently deleted.</p>
              </div>
              <button className="btn btn-danger" onClick={handleReset}>
                Confirm Reset
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>About</h3>
        </div>
        <div style={{ padding: 24, color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6 }}>
          <p><strong style={{ color: '#e2e8f0' }}>7J&Tech Dental Dashboard</strong></p>
          <p>Version 1.0.0</p>
          <p>Built with React 19 + Vite + TypeScript</p>
          <p style={{ marginTop: 12 }}>Features: Income tracking, expense management, SOA generation, payroll calculation, attendance tracking.</p>
          <p style={{ marginTop: 8 }}>Hidden panels require admin PIN: <code style={{ background: '#1e293b', padding: '2px 6px', borderRadius: 4 }}>7JTECH2026</code></p>
        </div>
      </div>
    </div>
  )
}
