import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../App';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/NavMenu.css';

function NavMenu()  {
  const [context, updateContext] = useContext(Context)
  const [collapsed, setCollased] = useState(true)

  useEffect(() => {
    var token = localStorage.getItem("token", context.user.password)
    if(token){
      const fetchData = async () => {await fetch("user/" + token)
        .then( response => !response.ok ? console.log(response) : response.json() )
        .then( data => {
          if(data){
            localStorage.setItem("token", data.password)
          }
        })
      }

      fetchData()
    }
  }, [])

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">TwixApp</NavbarBrand>
          <NavbarToggler onClick={() => setCollased(!collapsed)} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} onClick={() => setCollased(true)} className="text-dark" to="/About">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} onClick={() => setCollased(true)} className="text-dark" to="/Twix">Twix</NavLink>
              </NavItem>
              {context.user.id > 0 ? 
              <>
                <NavItem>
                  <NavLink tag={Link} onClick={() => setCollased(true)} className="text-dark" to="/Pops">Pops</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => (updateContext({user: {id: 0, pops: {}}}), setCollased(true), localStorage.setItem("token", null))} tag={Link} className="text-dark" to="/">Sign out</NavLink>
                </NavItem>
              </>:<>
                <NavItem>
                  <NavLink tag={Link} onClick={() => setCollased(true)} className="text-dark" to="/Connect">Sign in</NavLink>
                </NavItem>
              </>}
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavMenu