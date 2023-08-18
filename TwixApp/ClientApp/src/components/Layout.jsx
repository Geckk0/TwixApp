import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import home from '../styles/Home.css'

function Layout(props) {
  
  return (
    <div className='main'>
      <NavMenu />
      <Container>
        {props.children}
      </Container>
    </div>
  );
}

export default Layout