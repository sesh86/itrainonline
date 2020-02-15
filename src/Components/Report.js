import React, { Component } from 'react';
import PageTable from './PageTable'
import '../App.css';
import axios from 'axios';
import { connect } from 'react-redux'
import { mapDispatchReport } from '../Reducer/action';
import {getDate,dateFormat,getCookie,statuses,emps,sources,courses} from './General';


class Report extends Component {
    constructor(props) {
        super(props);
        if(!getCookie('jwt')) this.props.history.push('/login');
        
        this.state = {
            data:[]
        }
        this.callAPI()
      }
      callAPI = () => {
        console.log(this.state.search)
        this.props.getReport();
      }
      onSubmit=(ev)=>{
        ev.preventDefault();
        let login={};
    
        for(let i in ev.target.elements){
            if(ev.target.elements[i].value!==undefined && ev.target.elements[i].value!==''){
              login[ev.target.elements[i].name]=ev.target.elements[i].value;
            }
        }
        console.log(login)        
        axios.post('/getReport',login)
        .then(res=>{
            this.setState({data:res.data})
        });        
      }
  render() {
    let res = this.state.data;

    let updated={},created={};
    res.map(e=>{updated[e.assignedto]=(updated[e.assignedto]?updated[e.assignedto]:0)+e.updated;created[e.assignedto]=(created[e.assignedto]?created[e.assignedto]:0)+e.created})

    let names=Object.keys(created);
    let ret=[];
    names.map(e=>{ret.push({assignedto:e,updated:updated[e],created:created[e]})})


    let today = new Date();
    today=today.toISOString().substr(0, 10)
console.log(ret);
    return (
      <div className="container">  
        <form onSubmit={this.onSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
          From<input type="date" name="from" className="form-control" defaultValue={today}></input>
          </td><td>
          To<input type="date" name="to" className="form-control"  defaultValue={today}></input>
          </td><td>
          <br></br>
          <button className="form-control btn btn-dark">Get Report</button>
          </td>
          </tr>
          </tbody>
          </table>
        </form> 
        <br/><br/>

        <table className="table">
           {res.length>0?<thead>
              <tr>
                <td>Employee</td><td>New Leads</td><td>Follow-ups</td><td>Total</td>
              </tr>
            </thead>:''}          
          <tbody>
        {res.length>0?ret.map((d,i)=>
            (<tr><td>{d.assignedto}</td><td>{d.created}</td><td>{d.updated-d.created}</td><td>{d.updated}</td></tr>)
        ):''}
        </tbody>
        </table>     
      </div>
    );
  }
}

const mapStateToProps = (state) => { return { state: state } }
export default connect(mapStateToProps, mapDispatchReport)(Report);

