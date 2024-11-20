import React from 'react'
import { Link } from 'react-router-dom'

export default function LeftNav() {
  return (
    <nav className="sidebar">
    <ul>
        <li><Link to="/layout"><span>📊</span> Dashboard</Link></li>
        <li><Link to="startsell"><span>🛒</span> Start Sell</Link></li>
        <li><Link to="Orderreport"><span>📄</span> Order Report</Link></li>
        <li><Link to="additem"><span>📦</span>Add Product</Link></li>
        <li><Link to="itemlisting"><span>📦</span> Product Report</Link></li>
        <li><Link to="#"><span>🏢</span> Company Report</Link></li>
        <li><Link to="#"><span>📁</span> Category Report</Link></li>
        <li><Link to="#"><span>🚪</span> Logout</Link></li>
    </ul>
</nav>
  )
}
