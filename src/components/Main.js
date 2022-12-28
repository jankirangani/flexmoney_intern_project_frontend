import React from 'react'
import { Link } from 'react-router-dom'

export default function Main() {
  return (
    <div>
        <br/><br/>
        <Link to = "/form" className="btn btn-dark mx-3">New user</Link><br/><br/>
        <Link to = "/checkpayment" className="btn btn-dark mx-3">Existing user</Link>

    </div>
  )
}
