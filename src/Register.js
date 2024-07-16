import React, {useState} from 'react'
import { Link } from 'react-router-dom';

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
  <div className="container" style={{ marginTop: "10vh" }}>
            <form >
                <h2> Create your account</h2>
                <p>Welcome </p>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address :</label>
                    <input onChange={e => { setEmail(e.target.value) }} type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password :</label>
                    <input onChange={e => { setPassword(e.target.value) }} type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">LOG IN</button>
                <p style={{ marginTop: "2vh" }}>Have an account?<Link to={'/Login'}>Login</Link></p>

            </form>
        </div>
  )
}
