import React from 'react'
import Head from '../components/Head'
import LeftNav from '../components/LeftNav'
import '../styles/dashBoard.css'
import {Outlet} from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <Head/>
    <div className="main-container">
       <LeftNav/>
        <main className="content">
            <Outlet/>
        </main>
    </div>
    
    </>

  )
}
