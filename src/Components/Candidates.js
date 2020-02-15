import React, { Component } from 'react';
import PageTable from './PageTable'
import '../App.css';
import load from '../load.gif';
import {ButtonToolbar,Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { mapDispatchRecruiters } from '../Reducer/action';
import { mapDispatchCandidates } from '../Reducer/action';

import {getCookie} from './General';


class Candidates extends Component {
  componentDidMount() { }
  constructor(props) {
    super(props);
    if(!getCookie('jwt')) this.props.history.push('/login');
    
    this.state = {
      options: {"page":1,"per_page":50,"filter":null,"opening":null,"status":null,"assignedto":null,sortBy:11,"order":'asc'},
      res: { "count": 0, "data": [] },
    }
    this.callAPI()
  }
  callAPI = () => {
    console.log(this.state.search)
    this.props.getCandidates(this.state.options);
  }
  getPage = (e) => {
    let options = this.state.options;
    options['page'] = e;
    this.setState = { curr: Number(e), options: options }
    this.callAPI();
  }
  sortBy = (e) => {
    let l_order;
    if(this.state.options.sortBy===(e+1)){
      l_order=this.state.options.order==='asc'?'desc':'asc';
    } 
    else{
      l_order='asc';
    }
    let options = this.state.options;
    options.sortBy=e+1;
    options.order=l_order;    
    this.setState = { options: options }
    this.callAPI();
  }
  searchForOpening = (ev) => {
    console.log(ev.target.name)
    let options = this.state.options;
    if(ev.target.name==='assignedto'){
      options.assignedto=ev.target.value!==""?ev.target.value:null;
    }
    else if(ev.target.name==='opening'){
      options.opening=ev.target.value!==""?ev.target.value:null;
    }
    else if(ev.target.name==='status'){
      options.status=ev.target.value!==""?ev.target.value:null;
    }        
    else{
      options.filter=ev.target.value!==""?ev.target.value:null;
    }

    this.setState = { options: options}
    this.callAPI();
  }
  searchFor = (e) => {
    if (e.key === 'Enter') {
      let options = this.state.options;
      options.filter= e.target.value ;
      this.setState = { options: options}
      this.callAPI()
    }
  }
  
  render() {
    let res = this.props.state.candidates,header=['id','Created Date','name','mobile','Alt Mob','opening','source','Assigned To','status','Due Date'],options=this.state.options,loading=this.props.state.loading,openings=this.props.state.openings,
    emps=this.props.state.recruiters,statuses=this.props.state.r_statuses,sources=this.props.state.r_sources;

    // res.data=dateFormat(res.data,getDate(header));
    let searched='';
    try{
      searched=this.state.options.options['$or'][0].name['$regex'];
    }
    catch(e){}
    console.log(searched)
    return (
      <div className="container">        
      {!loading?
      <div>
      <h5>Filters</h5>
      <form onChange={this.searchForOpening}>
      <div className="row">
      <div className="col-4">
          Opening
        <select  name="opening" className="form-control" defaultValue={this.state.options.filter}>
          <option></option>
          {openings.map((c,i)=><option key={i}>{c}</option>)}
        </select>
        </div>
        <div className="col-4">
        Status
        <select name="status" className="form-control">
          <option></option>
          {statuses.map((s,i)=><option key={i} selected={options.status===s?'selected':''}>{s}</option>)}
        </select>
        </div>
        <div className="col-4">
        Assigned To        
        <select name="assignedto" className="form-control">
          <option></option>
          {emps.map((e,i)=><option key={i}>{e}</option>)}
        </select>
        </div>        
      </div>
      </form>
      <PageTable link='candidate' res={res} header={header} getPage={this.getPage} sortBy={this.sortBy} searched={searched} searchFor={this.searchFor} options={options}
      ukey='mobile'/>
      </div>
      :
      <div className="text-center"><img alt="loading" src={load}/></div>
      }

      </div>
    );
  }
}

const mapStateToProps = (state) => { return { state: state } }
export default connect(mapStateToProps, mapDispatchCandidates)(Candidates);