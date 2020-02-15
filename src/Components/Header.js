import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap'

class Header extends Component {

    render()
    {
        return(<header>
<Navbar expand="lg" bg="dark" className="bg-darkblue">
  <Navbar.Brand href="#home"><h1 className="text">iTrain Technologies</h1></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
  </Navbar.Collapse>
</Navbar>          
          </header>)
}
}

export default Header;