import { useState, useCallback } from 'react'
import { DataStore, expenseTypes } from '../stores/DataStore'
import HiddenPanel from '../components/HiddenPanel'
import { Plus, Trash2 } from 'lucide-react'

function formatMoney(n: number) {
  return '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function formatMoneyNoSymbol(n: number) {
  return n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

interface Props {
  isEditing: boolean
}

export default function Phase2({ isEditing }: Props) {
  const [refresh, setRefresh] = useState(0)
  const [newExpDate, setNewExpDate] = useState('2026-06-01')
  const [newExpType, setNewExpType] = useState('')
  const [newExpDesc, setNewExpDesc] = useState('')
  const [newExpAmount, setNewExpAmount] = useState('')

  const forceUpdate = useCallback(() => setRefresh(r => r + 1), [])

  const totals = DataStore.getTotals()

  const updateIncome = (idx: number, field: string, value: any) => {
    DataStore.updateIncome(idx, field as any, value)
    forceUpdate()
  }

  const addIncomeRow = () => {
    DataStore.addIncome()
    forceUpdate()
  }

  const updateExpense = (idx: number, field: string, value: any) => {
    DataStore.updateExpense(idx, field as any, value)
    forceUpdate()
  }

  const deleteExpense = (idx: number) => {
    if (confirm('Delete this expense?')) {
      DataStore.deleteExpense(idx)
      forceUpdate()
    }
  }

  const addExpense = () => {
    const amount = parseFloat(newExpAmount) || 0
    if (!newExpType || amount <= 0) {
      alert('Please select type and enter amount')
      return
    }
    DataStore.addExpense(newExpDate, newExpType, newExpDesc, amount)
    setNewExpDesc('')
    setNewExpAmount('')
    forceUpdate()
  }

  return (
    <div id="phase2" className="phase active">
      {/* Summary Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Income</div>
          <div className="kpi-value positive">{formatMoney(totals.totalIncome)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Expenses</div>
          <div className="kpi-value negative">{formatMoney(totals.totalExpenses)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Net</div>
          <div className="kpi-value neutral">{formatMoney(totals.net)}</div>
        </div>
      </div>

      {/* Formula Box */}
      <div className="formula-box">
        <h4>Formula</h4>
        <div className="formula">
          <span className="formula-part income">Gross Income</span>
          <span className="formula-op">−</span>
          <span className="formula-part expense">Expenses</span>
          <span className="formula-op">=</span>
          <span className="formula-part result">Net Income</span>
        </div>
      </div>

      {/* Income Table */}
      <div className="table-card">
        <div className="table-header">
          <h3>Income Records</h3>
          {isEditing && (
            <button className="btn btn-primary" onClick={addIncomeRow}>
              <Plus size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Add Row
            </button>
          )}
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th><th>Duty</th><th>Patient</th><th>Procedure</th>
                <th>Lab Fee</th><th>Discount</th><th>Amount Paid</th>
                <th>%Comm</th><th>PCT</th><th>Terminal</th>
                <th>CC Fee</th><th>HMO</th><th>Gross</th>
                <th>Salary</th><th>Net</th>
              </tr>
            </thead>
            <tbody>
              {DataStore.income.map((row, idx) => (
                <tr key={idx}>
                  {isEditing ? (
                    <>
                      <td><input type="date" value={row.date} onChange={e => updateIncome(idx, 'date', e.target.value)} /></td>
                      <td><input type="text" value={row.duty} onChange={e => updateIncome(idx, 'duty', e.target.value)} /></td>
                      <td><input type="text" value={row.patient} onChange={e => updateIncome(idx, 'patient', e.target.value)} /></td>
                      <td><input type="text" value={row.procedure} onChange={e => updateIncome(idx, 'procedure', e.target.value)} /></td>
                      <td><input type="number" value={row.labFee} onChange={e => updateIncome(idx, 'labFee', parseFloat(e.target.value) || 0)} /></td>
                      <td><input type="number" value={row.discount} onChange={e => updateIncome(idx, 'discount', parseFloat(e.target.value) || 0)} /></td>
                      <td><input type="number" value={row.amountPaid} onChange={e => updateIncome(idx, 'amountPaid', parseFloat(e.target.value) || 0)} /></td>
                      <td><input type="number" value={row.percentCommission} onChange={e => updateIncome(idx, 'percentCommission', parseFloat(e.target.value) || 0)} /></td>
                      <td><input type="number" value={row.pct} onChange={e => updateIncome(idx, 'pct', parseFloat(e.target.value) || 0)} /></td>
                      <td><input type="text" value={row.paymentTerminal} onChange={e => updateIncome(idx, 'paymentTerminal', e.target.value)} /></td>
                      <td className="num">{formatMoneyNoSymbol(row.ccMerchantFee)}</td>
                      <td><input type="number" value={row.hmo} onChange={e => updateIncome(idx, 'hmo', parseFloat(e.target.value) || 0)} /></td>
                      <td className="num">{formatMoneyNoSymbol(row.totalGross)}</td>
                      <td>{row.salaryRestricted}</td>
                      <td className="num">{formatMoneyNoSymbol(row.netTotal)}</td>
                    </>
                  ) : (
                    <>
                      <td>{row.date}</td>
                      <td>{row.duty}</td>
                      <td>{row.patient}</td>
                      <td>{row.procedure}</td>
                      <td className="num">{formatMoneyNoSymbol(row.labFee)}</td>
                      <td className="num">{formatMoneyNoSymbol(row.discount)}</td>
                      <td className="num">{formatMoneyNoSymbol(row.amountPaid)}</td>
                      <td className="num">{row.percentCommission}%</td>
                      <td className="num">{row.pct}</td>
                      <td>{row.paymentTerminal}</td>
                      <td className="num">{formatMoneyNoSymbol(row.ccMerchantFee)}</td>
                      <td className="num">{formatMoneyNoSymbol(row.hmo)}</td>
                      <td className="num">{formatMoneyNoSymbol(row.totalGross)}</td>
                      <td>{row.salaryRestricted}</td>
                      <td className="num">{formatMoneyNoSymbol(row.netTotal)}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expense Table */}
      <div className="table-card">
        <div className="table-header">
          <h3>Expense Records</h3>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr><th>#</th><th>Date</th><th>Type</th><th>Description</th><th>Amount</th><th></th></tr>
            </thead>
            <tbody>
              {DataStore.expenses.map((row, idx) => (
                <tr key={row.id}>
                  {isEditing ? (
                    <>
                      <td>{idx + 1}</td>
                      <td><input type="date" value={row.date} onChange={e => updateExpense(idx, 'date', e.target.value)} /></td>
                      <td>
                        <select value={row.type} onChange={e => updateExpense(idx, 'type', e.target.value)}>
                          {expenseTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </td>
                      <td><input type="text" value={row.description} onChange={e => updateExpense(idx, 'description', e.target.value)} /></td>
                      <td><input type="number" value={row.amount} onChange={e => updateExpense(idx, 'amount', parseFloat(e.target.value) || 0)} /></td>
                      <td>
                        <button className="btn btn-danger" onClick={() => deleteExpense(idx)}>
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{idx + 1}</td>
                      <td>{row.date}</td>
                      <td>{row.type}</td>
                      <td>{row.description}</td>
                      <td className="num">{formatMoneyNoSymbol(row.amount)}</td>
                      <td></td>
                    </>
                  )}
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan={4} style={{ textAlign: 'right' }}>TOTAL EXPENSES:</td>
                <td className="num">{formatMoneyNoSymbol(totals.totalExpenses)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Add Expense Form */}
        <div className="add-form">
          <input type="date" value={newExpDate} onChange={e => setNewExpDate(e.target.value)} />
          <select value={newExpType} onChange={e => setNewExpType(e.target.value)}>
            <option value="">Select Type</option>
            {expenseTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <input type="text" placeholder="Description" value={newExpDesc} onChange={e => setNewExpDesc(e.target.value)} />
          <input type="number" placeholder="Amount" value={newExpAmount} onChange={e => setNewExpAmount(e.target.value)} />
          <button className="btn btn-primary" onClick={addExpense}>
            <Plus size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Add Expense
          </button>
        </div>
      </div>

      {/* Hidden Panel - Admin Only */}
      <HiddenPanel title="Admin Controls - Salary Data" requiredRole="admin">
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Restricted salary and commission data. PIN required to view.
        </p>
        <div className="table-scroll" style={{ marginTop: 16 }}>
          <table className="data-table">
            <thead>
              <tr><th>Employee</th><th>Code</th><th>Role</th><th>Base Salary</th><th>Commission</th><th>YTD Earnings</th></tr>
            </thead>
            <tbody>
              {DataStore.employees.map(emp => (
                <tr key={emp.code}>
                  <td>{emp.name}</td>
                  <td>{emp.code}</td>
                  <td>{emp.role}</td>
                  <td className="num">{formatMoneyNoSymbol(emp.baseSalary)}</td>
                  <td className="num">{emp.commissionRate > 0 ? (emp.commissionRate * 100) + '%' : 'N/A'}</td>
                  <td className="num">{formatMoneyNoSymbol(emp.ytdEarnings)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </HiddenPanel>
    </div>
  )
}
