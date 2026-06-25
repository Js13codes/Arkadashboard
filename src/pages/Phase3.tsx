import { useState } from 'react'
import { DataStore, employees } from '../stores/DataStore'
import HiddenPanel from '../components/HiddenPanel'
import { Download, FileText } from 'lucide-react'

function formatMoney(n: number) {
  return '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function Phase3() {
  const [selectedEmp, setSelectedEmp] = useState('ER')
  const emp = employees.find(e => e.code === selectedEmp)
  const income = DataStore.getEmployeeIncome(selectedEmp)
  const commission = DataStore.getEmployeeCommission(selectedEmp)
  const gross = DataStore.getEmployeeGross(selectedEmp)

  const totalIncome = income.reduce((s, r) => s + r.amountPaid, 0)
  const totalHMO = income.reduce((s, r) => s + r.hmo, 0)
  const totalLab = income.reduce((s, r) => s + r.labFee, 0)
  const totalCC = income.reduce((s, r) => s + r.ccMerchantFee, 0)

  return (
    <div id="phase3" className="phase active">
      <div className="table-card" style={{ marginBottom: 24 }}>
        <div className="table-header">
          <h3><FileText size={16} style={{ verticalAlign: 'middle', marginRight: 8 }} /> Statement of Account & Payroll</h3>
        </div>
        <div style={{ padding: '16px 20px' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.875rem', marginRight: 12 }}>Select Employee:</label>
          <select
            value={selectedEmp}
            onChange={e => setSelectedEmp(e.target.value)}
            style={{
              background: '#1e293b', border: '1px solid #334155', borderRadius: 8,
              padding: '8px 16px', color: '#e2e8f0', fontSize: '0.875rem', fontFamily: 'inherit'
            }}
          >
            {employees.map(e => (
              <option key={e.code} value={e.code}>{e.name} ({e.code})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Employee Summary */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Employee</div>
          <div className="kpi-value">{emp?.name}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Income Generated</div>
          <div className="kpi-value positive">{formatMoney(totalIncome)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Commission ({emp?.commissionRate ? (emp.commissionRate * 100) + '%' : 'N/A'})</div>
          <div className="kpi-value neutral">{formatMoney(commission)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Base Salary</div>
          <div className="kpi-value">{formatMoney(emp?.baseSalary || 0)}</div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className="table-card">
        <div className="table-header">
          <h3>Transaction Details</h3>
          <button className="btn btn-primary">
            <Download size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Export
          </button>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th><th>Patient</th><th>Procedure</th><th>Amount</th>
                <th>Lab Fee</th><th>HMO</th><th>CC Fee</th><th>Net</th>
              </tr>
            </thead>
            <tbody>
              {income.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.date}</td>
                  <td>{row.patient}</td>
                  <td>{row.procedure}</td>
                  <td className="num">{formatMoney(row.amountPaid)}</td>
                  <td className="num">{formatMoney(row.labFee)}</td>
                  <td className="num">{formatMoney(row.hmo)}</td>
                  <td className="num">{formatMoney(row.ccMerchantFee)}</td>
                  <td className="num">{formatMoney(row.netTotal)}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan={3} style={{ textAlign: 'right' }}>TOTALS:</td>
                <td className="num">{formatMoney(totalIncome)}</td>
                <td className="num">{formatMoney(totalLab)}</td>
                <td className="num">{formatMoney(totalHMO)}</td>
                <td className="num">{formatMoney(totalCC)}</td>
                <td className="num">{formatMoney(gross - totalCC)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Hidden Panel - Pay Stub */}
      <HiddenPanel title="Pay Stub - Confidential" requiredRole="admin">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <h4 style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: 12 }}>EARNINGS</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1e293b' }}>
              <span style={{ color: '#cbd5e1' }}>Base Salary</span>
              <span style={{ color: '#22c55e', fontWeight: 600 }}>{formatMoney(emp?.baseSalary || 0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1e293b' }}>
              <span style={{ color: '#cbd5e1' }}>Commission</span>
              <span style={{ color: '#22c55e', fontWeight: 600 }}>{formatMoney(commission)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', marginTop: 8 }}>
              <span style={{ color: '#fbbf24', fontWeight: 700 }}>GROSS PAY</span>
              <span style={{ color: '#fbbf24', fontWeight: 700 }}>{formatMoney((emp?.baseSalary || 0) + commission)}</span>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: 12 }}>DEDUCTIONS</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1e293b' }}>
              <span style={{ color: '#cbd5e1' }}>SSS</span>
              <span style={{ color: '#ef4444' }}>₱0.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1e293b' }}>
              <span style={{ color: '#cbd5e1' }}>PhilHealth</span>
              <span style={{ color: '#ef4444' }}>₱0.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1e293b' }}>
              <span style={{ color: '#cbd5e1' }}>Pag-IBIG</span>
              <span style={{ color: '#ef4444' }}>₱0.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', marginTop: 8 }}>
              <span style={{ color: '#fbbf24', fontWeight: 700 }}>NET PAY</span>
              <span style={{ color: '#fbbf24', fontWeight: 700 }}>{formatMoney((emp?.baseSalary || 0) + commission)}</span>
            </div>
          </div>
        </div>
      </HiddenPanel>
    </div>
  )
}
