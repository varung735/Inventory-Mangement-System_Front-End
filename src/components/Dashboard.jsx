import React from 'react'
import dashboardCSS from '../styles/dashboard.module.css'
import SideNav from './SideNav'

const admin = [
  "Sales", "Purchases", "Expenses", "Inventory", "Stock",
  Employee = ["Employees", "Add Employee", "Remove Employee", "Update Employee"],
  Salary = ["Paid Salaries", "Pay Salary", "Update Payment", "Delete Payment"]
];

const employee = [
  sales = ["Sales", "Add Sale", "Update Sale", "Delete Sale"],
  purchases = ["Purchases", "Add Purchase", "Update Purchase", "Delete Purchase"],
  expenses = ["Expenses", "Add Expense", ""],
  inventory = [],
  stock = []
];

function Dashboard() {
  return (
    <div className={dashboardCSS.container}>

      {/* NavBar */}
      <div className={dashboardCSS.navbar}></div>

      {/* Main Content */}
      <div className={dashboardCSS.mainContent}>

        {/* sidenav */}
        <SideNav />

        {/* Main Content */}


      </div>
    </div>
  )
}

export default Dashboard