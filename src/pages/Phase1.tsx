import { useEffect, useRef } from 'react'
import { DataStore } from '../stores/DataStore'
import { TrendingUp, TrendingDown, Wallet, Percent } from 'lucide-react'

function formatMoney(n: number) {
  return '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function Phase1() {
  const barRef = useRef<HTMLCanvasElement>(null)
  const donutRef = useRef<HTMLCanvasElement>(null)
  const lineRef = useRef<HTMLCanvasElement>(null)

  const totals = DataStore.getTotals()

  useEffect(() => {
    renderBarChart()
    renderDonutChart()
    renderLineChart()

    function handleResize() {
      renderBarChart()
      renderDonutChart()
      renderLineChart()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function setupCanvas(canvas: HTMLCanvasElement | null) {
    if (!canvas) return null
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)
    return { ctx, w: rect.width, h: rect.height }
  }

  function renderBarChart() {
    const c = setupCanvas(barRef.current)
    if (!c) return
    const { ctx, w, h } = c
    ctx.clearRect(0, 0, w, h)

    const max = Math.max(totals.totalIncome, totals.totalExpenses, totals.net) * 1.1
    const barW = 60, gap = 40
    const startX = (w - (barW * 3 + gap * 2)) / 2

    const bars = [
      { label: 'Income', val: totals.totalIncome, color: '#22c55e' },
      { label: 'Expenses', val: totals.totalExpenses, color: '#ef4444' },
      { label: 'Net', val: totals.net, color: '#38bdf8' },
    ]

    bars.forEach((b, i) => {
      const x = startX + i * (barW + gap)
      const barH = (b.val / max) * (h - 60)
      const y = h - 40 - barH

      ctx.fillStyle = b.color
      ctx.fillRect(x, y, barW, barH)

      ctx.fillStyle = '#e2e8f0'
      ctx.font = 'bold 11px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('₱' + (b.val / 1000).toFixed(1) + 'k', x + barW / 2, y - 8)

      ctx.fillStyle = '#94a3b8'
      ctx.font = '10px Inter, sans-serif'
      ctx.fillText(b.label, x + barW / 2, h - 20)
    })
  }

  function renderDonutChart() {
    const c = setupCanvas(donutRef.current)
    if (!c) return
    const { ctx, w, h } = c
    const cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 - 30

    const data = [
      { label: 'Net', val: Math.max(totals.net, 0), color: '#38bdf8' },
      { label: 'Expenses', val: totals.totalExpenses, color: '#ef4444' },
    ]
    const total = data.reduce((s, d) => s + d.val, 0)
    if (total === 0) return

    let start = -Math.PI / 2
    data.forEach(d => {
      const angle = (d.val / total) * Math.PI * 2
      ctx.beginPath()
      ctx.arc(cx, cy, r, start, start + angle)
      ctx.strokeStyle = d.color
      ctx.lineWidth = 24
      ctx.stroke()
      start += angle
    })

    ctx.fillStyle = '#e2e8f0'
    ctx.font = 'bold 14px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('₱' + (totals.net / 1000).toFixed(1) + 'k', cx, cy - 4)
    ctx.fillStyle = '#94a3b8'
    ctx.font = '10px Inter, sans-serif'
    ctx.fillText('NET', cx, cy + 14)

    let ly = h - 30
    data.forEach(d => {
      ctx.fillStyle = d.color
      ctx.fillRect(10, ly, 12, 12)
      ctx.fillStyle = '#94a3b8'
      ctx.font = '10px Inter, sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText(d.label + ' (' + ((d.val / total) * 100).toFixed(1) + '%)', 28, ly + 10)
      ly += 18
    })
  }

  function renderLineChart() {
    const c = setupCanvas(lineRef.current)
    if (!c) return
    const { ctx, w, h } = c
    ctx.clearRect(0, 0, w, h)

    const daily: Record<string, number> = {}
    for (let d = 1; d <= 30; d++) daily[`2026-06-${String(d).padStart(2, '0')}`] = 0
    DataStore.income.forEach(r => { daily[r.date] = (daily[r.date] || 0) + r.amountPaid })

    const days = Object.keys(daily).sort()
    const values = days.map(d => daily[d])
    const max = Math.max(...values, 1) * 1.1

    const pad = 40
    const chartW = w - pad * 2
    const chartH = h - pad * 2
    const stepX = chartW / (days.length - 1)

    ctx.strokeStyle = '#334155'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= 5; i++) {
      const y = pad + (chartH / 5) * i
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(w - pad, y); ctx.stroke()
    }

    ctx.beginPath()
    ctx.strokeStyle = '#fbbf24'
    ctx.lineWidth = 2
    days.forEach((d, i) => {
      const x = pad + i * stepX
      const y = pad + chartH - (values[i] / max) * chartH
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
    })
    ctx.stroke()

    days.forEach((d, i) => {
      const x = pad + i * stepX
      const y = pad + chartH - (values[i] / max) * chartH
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill()
    })

    ctx.fillStyle = '#94a3b8'
    ctx.font = '9px Inter, sans-serif'
    ctx.textAlign = 'center'
    days.forEach((d, i) => {
      if (i % 5 === 0 || i === days.length - 1) {
        const day = d.split('-')[2]
        ctx.fillText(day, pad + i * stepX, h - 10)
      }
    })

    ctx.fillStyle = '#fbbf24'
    ctx.font = 'bold 11px Inter, sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('Daily Income Trend (June 2026)', pad, 20)
  }

  return (
    <div id="phase1" className="phase active">
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label"><TrendingUp size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Gross Income</div>
          <div className="kpi-value positive">{formatMoney(totals.totalIncome)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label"><TrendingDown size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Expenses</div>
          <div className="kpi-value negative">{formatMoney(totals.totalExpenses)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label"><Wallet size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Net Income</div>
          <div className={`kpi-value ${totals.net >= 0 ? 'positive' : 'negative'}`}>{formatMoney(totals.net)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label"><Percent size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Margin</div>
          <div className="kpi-value neutral">{totals.margin}%</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Income vs Expenses vs Net</h3>
          <canvas ref={barRef} className="chart-canvas" />
        </div>
        <div className="chart-card">
          <h3>Distribution</h3>
          <canvas ref={donutRef} className="chart-canvas" />
        </div>
        <div className="chart-card full-width">
          <h3>Daily Income Trend</h3>
          <canvas ref={lineRef} className="chart-canvas" style={{ height: 180 }} />
        </div>
      </div>
    </div>
  )
}
