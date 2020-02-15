import React, { Component } from 'react';
import {Link , NavLink,withRouter} from 'react-router-dom';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import axios from 'axios';
import {getCookie} from './General';
import { connect } from 'react-redux'
import { mapDispatchRecruiters } from '../Reducer/action';
class NavBar extends Component {
  logout=()=>{
    axios.post('/logout')
    .then(res=>{
      this.props.history.push('/login');  
    });
  }
  constructor(props){
    super(props);
    props.getRecruiters();
    props.getStatuses();
    props.getSources();
    props.getAllOpenings();    
  }
    render(){
  return(
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    {getCookie('role')==='user'?<Navbar.Brand><Link className="white" to="/">i-Train.co</Link></Navbar.Brand>:<span></span>}
    {getCookie('role')==='consultant'?<Navbar.Brand><Link className="white" to="/candidates">i-Train.co</Link></Navbar.Brand>:<span></span>}  
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
  {getCookie('jwt')?
    <Nav className="mr-auto">
      {getCookie('role')==='user'?<Nav.Link><NavLink className="navLink" to="/createEnq">Add-Enquiry</NavLink></Nav.Link>:<span></span>}
      {getCookie('role')==='user'?<Nav.Link><NavLink className="navLink" to="/Enquiries">Enquiries</NavLink></Nav.Link>:<span></span>}      
      {getCookie('role')==='consultant'?<Nav.Link><NavLink className="navLink" to="/createCandidate">Add-Candidate</NavLink></Nav.Link>:<span></span>}
      {getCookie('role')==='consultant'?<Nav.Link><NavLink className="navLink" to="/candidates">Candidates</NavLink></Nav.Link>:<span></span>}      
      {getCookie('role')==='admin'?<Nav.Link><NavLink className="navLink" to="/createPayment">Add-Payment</NavLink></Nav.Link>:<span></span>}
      {getCookie('role')==='admin'?<Nav.Link><NavLink className="navLink" to="/createExpense">Add-Expense</NavLink></Nav.Link>:<span></span>}            
      {/* <NavDropdown title="Summary" id="collasible-nav-dropdown">
        <NavDropdown.Item><Link to="/Enquiries">Enquiries</Link></NavDropdown.Item>
        {getCookie('role')==='admin'?<span><NavDropdown.Divider />
        <NavDropdown.Item><Link to="/PaymentSummary">Payment</Link></NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item><Link to="/ExpenseSummary">Expense</Link></NavDropdown.Item></span>:<span></span>}
      </NavDropdown> */}
    </Nav>:<span></span>}
    <Nav>
      <Nav.Link eventKey={2} href="#memes">
        {getCookie('jwt')?
      <button className="btn btn-dark" onClick={()=>this.logout()}>Logout</button>:
      <span></span>}

      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>)
}
}

const mapStateToProps = (state) => { return { state: state } }
export default connect(mapStateToProps,mapDispatchRecruiters)(NavBar);