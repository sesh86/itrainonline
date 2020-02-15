import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import {getCookie,courses} from './General';
import Alert from 'react-bootstrap/Alert'
import { mapDispatchRecruiters } from '../Reducer/action';

class CreateCandidate extends Component { 
  constructor(props) {
    super(props);
    
    if(!getCookie('jwt')) this.props.history.push('/login');
    props.getRecruiters();
    props.getStatuses();
    props.getSources();
    props.getAllOpenings();
  }  
  
  state={error:''}
  onSubmit=(ev)=>{
    ev.preventDefault();
    let login={};
    
    for(let i in ev.target.elements){
        if(ev.target.elements[i].value!==undefined){
          login[ev.target.elements[i].name]=ev.target.elements[i].value;
        }
    }

    let comments=[],comment;
    if(login.comment!==undefined && login.comment!=='')
        comment=login.comment;

    login['comments']=[{comment:comment,date:new Date()}];

    console.log(login);
    // return;    
    axios.post('/createCandidate',login).then(res=>{this.props.history.push('/')});
  }

  render() {
    let recruiters=this.props.state.recruiters;
    let statuses=this.props.state.r_statuses;
    let sources=this.props.state.r_sources;
    let openings=this.props.state.openings;

    
    
    return (
      <div className="container cat">
        <br/>
        <br/>
        <h1>New Candidate</h1>
{/* 
        var enqs = mongoose.model('enqs', {name: String, mobile:String, email:String,course:String,source:String,location:String,assignedto:String,status:String,due_date:Date,enquiries:JSON});         */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          Name*<input type="text" name="name" required className="form-control"/>
          Mobile*<input type="number" name="mobile" required className="form-control"/>
          Alternate Mobile<input type="number" name="alternatemobile" className="form-control"/>
          Email<input type="email" name="email" className="form-control"/>
          Opening*<select required name="opening" className="form-control"><option></option>{openings.map((course,i) => (<option key={i}>{course}</option>))}</select>
          Location<input type="text" name="location" className="form-control"/>
          Source*<select required name="source" className="form-control"><option></option>{sources.map((s,i) => (<option key={i}>{s}</option>))}</select>
          Assigned To*
          <select required name="assignedto" className="form-control"><option></option>{recruiters.map((emp,i) => (<option key={i}>{emp}</option>))}</select>
          Status*
          <select required name="status" className="form-control"><option></option>{statuses.map((s,i) => (<option key={i}>{s}</option>))}</select>
          <br/> 
          Followup Date*<input type="date" required name="due_date" className="form-control"/>                    
          <br/>
          Additional Comments
          <input type="text" name="comment" className="form-control"/>
          <br/>
          {this.state.error!==''?<div><Alert variant="danger">{this.state.error}</Alert><br/></div>:null}          
          <button className="form-control btn btn-dark">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {return {state:state}}

export default connect(mapStateToProps,mapDispatchRecruiters)(CreateCandidate);
