import React from 'react'
import { Link  ,Outlet, useNavigate} from 'react-router-dom';

export default function Navbar() {
  let navigate=useNavigate();
  let handlelogout=()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    <div className='NavbarCont'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">iNotebook</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="about">about</Link>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link" href="/">Pricing</a>
                </li> */}
              </ul>
             { (!localStorage.getItem('token'))?<form  className="d-flex justify-content-end">
              <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
              </form>:<button className="btn btn-primary mx-2" onClick={handlelogout}> Logout</button>}
            </div>
          </div>
      </nav>
      <Outlet />
    </div>
  )
}
