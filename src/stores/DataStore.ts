export interface IncomeRecord {
  date: string
  duty: string
  patient: string
  procedure: string
  labFee: number
  discount: number
  amountPaid: number
  percentCommission: number
  pct: number
  paymentTerminal: string
  ccMerchantFee: number
  hmo: number
  totalGross: number
  salaryRestricted: string
  netTotal: number
}

export interface ExpenseRecord {
  id: number
  date: string
  type: string
  description: string
  amount: number
}

export interface Employee {
  code: string
  name: string
  role: string
  baseSalary: number
  commissionRate: number
  ytdEarnings: number
  ytdDeductions: number
}

const defaultIncome: IncomeRecord[] = [
  {date:'2026-06-01',duty:'KU',patient:'Reyes, Maria',procedure:'Resto',labFee:0,discount:0,amountPaid:3500,percentCommission:10,pct:0.1,paymentTerminal:'Cash',ccMerchantFee:0,hmo:0,totalGross:3500,salaryRestricted:'DATA FOR ADMIN ONLY',netTotal:3500},
  {date:'2026-06-01',duty:'KU',patient:'Santos, Pedro',procedure:'Exo',labFee:0,discount:0,amountPaid:1500,percentCommission:10,pct:0.1,paymentTerminal:'Cash',ccMerchantFee:0,hmo:0,totalGross:1500,salaryRestricted:'DATA FOR ADMIN ONLY',netTotal:1500},
  {date:'2026-06-02',duty:'GA',patient:'Lim, Anna',procedure:'Op',labFee:0,discount:0,amountPaid:800,percentCommission:10,pct:0.1,paymentTerminal:'Cash',ccMerchantFee:0,hmo:0,totalGross:800,salaryRestricted:'DATA FOR ADMIN ONLY',netTotal:800},
  {date:'2026-06-02',duty:'ER',patient:'Garcia, Jose',procedure:'RCT',labFee:0,discount:0,amountPaid:12000,percentCommission:10,pct:0.1,paymentTerminal:'Credit Card',ccMerchantFee:420,hmo:0,totalGross:12000,salaryRestricted:'DATA FOR ADMIN ONLY',netTotal:11580},
  {date:'2026-06-03',duty:'KU',patient:'Torres, Liza',procedure:'LC',labFee:0,discount:0,amountPaid:2200,percentCommission:10,pct:0.1,paymentTerminal:'BPI',ccMerchantFee:0,hmo:0,totalGross:2200,salaryRestricted:'DATA FOR ADMIN ONLY',netTotal:2200},
  {date:'2026-06-04',duty:'GA',patient:'Cruz, Ben',procedure:'Denture',labFee:0,discount:0,amountPaid:8500,percentCommission:10,pct:0.1,paymentTerminal:'Cash',ccMerchantFee:0,hmo:0,totalGross:8500,salaryRestricted:'DATA FOR ADMIN ONLY',netTotal:8500},
  {date:'2026-06-05',duty:'ER',patient:'Dela Cruz, Mila',procedure:'Odontec',labFee:0,discount:0,amountPaid:15000,percentCommission:10,pct:0.1,paymentTerminal:'Cash',ccMerchantFee:0,hmo:0,totalGross:15000,salaryRestricted:'DATA FOR ADMIN ONLY',netTotal:15000},
  {date:'2026-06-06',duty:'KU',patient:'Bautista, Nena',procedure:'Adjust',labFee:0,discount:0,amountPaid:1500,percentCommission:10,pct:0.1,paymentTerminal:'Gcash',ccMerchantFee:0,hmo:0,totalGross:1500,salaryRestricted:'DATA FOR ADMIN ONLY',netTotal:1500},
  {date:'2026-06-07',duty:'GA',patient:'Ramos, Tony',procedure:'Xray',labFee:0,discount:0,amountPaid:350,percentCommission:10,pct:0.1,paymentTerminal:'Cash',ccMerchantFee:0,hmo:0,totalGross:350,salaryRestricted:'DATA FOR ADMIN ONLY',netTotal:350},
  {date:'2026-06-08',duty:'ER',patient:'Fernandez, Amy',procedure:'PPM',labFee:0,discount:0,amountPaid:10000,percentCommission:10,pct:0.1,paymentTerminal:'Credit Card',ccMerchantFee:350,hmo:0,totalGross:10000,salaryRestricted:'DATA FOR ADMIN ONLY',netTotal:9650},
]

const defaultExpenses: ExpenseRecord[] = [
  {id:1,date:'2026-06-01',type:'Rent (70sqm)',description:'Monthly clinic rent',amount:18000},
  {id:2,date:'2026-06-01',type:'Water Bill',description:'Maynilad',amount:610},
  {id:3,date:'2026-06-01',type:'Wifi',description:'PLDT Fiber',amount:1399},
  {id:4,date:'2026-06-01',type:'Mobile Bill',description:'Globe postpaid',amount:606},
  {id:5,date:'2026-06-01',type:'Dental Supplies',description:'Gloves, composites',amount:7444},
  {id:6,date:'2026-06-01',type:'Assistant Salary',description:'Ryan + Mary + Arkin + Mika',amount:18300},
  {id:7,date:'2026-06-01',type:'Food',description:'Staff meals',amount:7296},
  {id:8,date:'2026-06-01',type:'Misc',description:'Various',amount:16817.75},
  {id:9,date:'2026-06-01',type:'Marketing/Ads',description:'Facebook ads',amount:7500},
  {id:10,date:'2026-06-01',type:'Equipment',description:'Chair installment',amount:11250},
  {id:11,date:'2026-06-01',type:'Other',description:'Frontier',amount:5890},
  {id:12,date:'2026-06-01',type:'Other',description:'L218',amount:19000},
]

export const expenseTypes = [
  'Rent (70sqm)','Water Bill','Wifi','Mobile Bill','Electric Bill',
  'Dental Supplies','Assistant Salary','Food','Misc','Marketing/Ads',
  'Equipment','Lab Fee','Tax','Other'
]

export const employees: Employee[] = [
  {code:'ER',name:'Dr. Eugine Francis Romero',role:'Dentist',baseSalary:0,commissionRate:0.10,ytdEarnings:0,ytdDeductions:0},
  {code:'GA',name:'Dr. Giselle Abrogena',role:'Dentist',baseSalary:0,commissionRate:0.10,ytdEarnings:0,ytdDeductions:0},
  {code:'KU',name:'Dr. Kenneth Uy',role:'Dentist',baseSalary:0,commissionRate:0.10,ytdEarnings:0,ytdDeductions:0},
  {code:'Ryan',name:'Ryan Bolonia',role:'Assistant',baseSalary:8000,commissionRate:0,ytdEarnings:0,ytdDeductions:0},
  {code:'Mary',name:'Mary [Lastname]',role:'Assistant',baseSalary:8000,commissionRate:0,ytdEarnings:0,ytdDeductions:0},
  {code:'Arkin',name:'Arkin [Lastname]',role:'Assistant',baseSalary:8000,commissionRate:0,ytdEarnings:0,ytdDeductions:0},
]

class Store {
  income: IncomeRecord[] = [...defaultIncome]
  expenses: ExpenseRecord[] = [...defaultExpenses]
  attendance: Record<string, Record<string, string>> = {}
  leaves: any[] = []

  constructor() { this.load(); this.initAttendance() }

  load() {
    try {
      const saved = localStorage.getItem('dentalData')
      if (saved) {
        const data = JSON.parse(saved)
        this.income = data.income || this.income
        this.expenses = data.expenses || this.expenses
        this.attendance = data.attendance || {}
        this.leaves = data.leaves || []
      }
    } catch (e) { console.error('Load error:', e) }
  }

  save() {
    localStorage.setItem('dentalData', JSON.stringify({
      income: this.income,
      expenses: this.expenses,
      attendance: this.attendance,
      leaves: this.leaves
    }))
  }

  initAttendance() {
    const codes = ['ER','GA','KU','Ryan','Mary','Arkin']
    codes.forEach(code => {
      if (!this.attendance[code]) {
        this.attendance[code] = {}
        for (let d = 1; d <= 30; d++) {
          const key = `2026-06-${String(d).padStart(2,'0')}`
          this.attendance[code][key] = 'present'
        }
      }
    })
  }

  getTotals() {
    const totalIncome = this.income.reduce((s, r) => s + r.amountPaid + r.hmo + r.labFee, 0)
    const totalExpenses = this.expenses.reduce((s, r) => s + r.amount, 0)
    const net = totalIncome - totalExpenses
    const margin = totalIncome > 0 ? ((net / totalIncome) * 100).toFixed(1) : '0'
    return { totalIncome, totalExpenses, net, margin }
  }

  getEmployeeIncome(code: string) {
    return this.income.filter(r => r.duty === code)
  }

  getEmployeeCommission(code: string) {
    return this.getEmployeeIncome(code).reduce((s, r) => s + (r.amountPaid * r.pct), 0)
  }

  getEmployeeGross(code: string) {
    return this.getEmployeeIncome(code).reduce((s, r) => s + r.totalGross, 0)
  }

  updateIncome(idx: number, field: keyof IncomeRecord, value: any) {
    (this.income[idx] as any)[field] = value
    const row = this.income[idx]
    row.totalGross = row.amountPaid + row.hmo + row.labFee
    row.netTotal = row.totalGross - row.ccMerchantFee - (row.amountPaid * row.pct)
    this.save()
  }

  addIncome() {
    this.income.push({
      date:'2026-06-09',duty:'',patient:'',procedure:'',labFee:0,discount:0,
      amountPaid:0,percentCommission:10,pct:0.1,paymentTerminal:'Cash',
      ccMerchantFee:0,hmo:0,totalGross:0,salaryRestricted:'DATA FOR ADMIN ONLY',netTotal:0
    })
    this.save()
  }

  updateExpense(idx: number, field: keyof ExpenseRecord, value: any) {
    (this.expenses[idx] as any)[field] = value
    this.save()
  }

  deleteExpense(idx: number) {
    this.expenses.splice(idx, 1)
    this.save()
  }

  addExpense(date: string, type: string, desc: string, amount: number) {
    this.expenses.push({ id: Date.now(), date, type, description: desc, amount })
    this.save()
  }
}

export const DataStore = new Store()
