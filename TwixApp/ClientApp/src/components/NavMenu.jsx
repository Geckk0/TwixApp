import React, { useState, useContext } from 'react';
import { Context } from '../App';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/NavMenu.css';

function NavMenu()  {
  const [context, updateContext] = useContext(Context)
  const [collapsed, setCollased] = useState(true)

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">TwixApp</NavbarBrand>
          <NavbarToggler onClick={() => setCollased(!collapsed)} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/Dev-log">Dev log</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/Twix">Twix</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/Pops">Pops</NavLink>
              </NavItem>
              <NavItem>
                {context.user ? 
                <NavLink onClick={() => updateContext({user: false})} tag={Link} className="text-dark" to="/">Sign out</NavLink>
                :
                <NavLink tag={Link} className="text-dark" to="/Connect">Sign in</NavLink>}
              </NavItem>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavMenu