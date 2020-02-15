import axios from 'axios';
import React, { Component } from 'react';
import '../App.css';
import { courses, emps } from './General';
import { getCookie } from './General';
import { connect } from 'react-redux'
import { mapDispatchCandidate } from '../Reducer/action'

class EditCandidate extends Component {
    constructor(props) {
        super(props);
        if (!getCookie('jwt')) this.props.history.push('/login');
        this.props.getCandidate({ name: this.props.match.params.sid });
    }
   
    onSubmit = (ev) => {
        ev.preventDefault();
        let comm = {};

        for (let i in ev.target.elements) {
            if (ev.target.elements[i].value !== undefined && ev.target.elements[i].value !== '') {
                comm[ev.target.elements[i].name] = ev.target.elements[i].value;
            }
        }
        comm['_id']=this.props.match.params.sid;
        console.log(comm);
        axios.post('/updateCandidate',{body:comm})
        .then(res=>{
            this.props.history.push('/candidate/'+comm.mobile)
        })    
    }

    render() {
        let data = this.props.state.candidate, candidate = data,openings=this.props.state.openings,emps=this.props.state.recruiters;
        console.log(data)
        return (
            <div className="container">
                <div>
                    <h3>candidate Details</h3>
                    <br />
                    <form onSubmit={this.onSubmit}>
                        <table className="table">
                            <thead>
                            </thead>
                            <tbody>
                                <tr><th>Name*</th><td><input required className="form-control" name="name" type="text" defaultValue={data.name} /></td></tr>
                                <tr><th>Mobile*</th><td><input required className="form-control" name="mobile" type="number" defaultValue={data.mobile} /></td></tr>
                                <tr><th>Alternate Mobile</th><td><input className="form-control" name="alternatemobile" type="number" defaultValue={data.alternatemobile} /></td></tr>
                                <tr><th>Email</th><td><input className="form-control" name="email" type="email" defaultValue={data.email} /></td></tr>
                                <tr><th>Location</th><td><input className="form-control" name="location" type="text" defaultValue={data.location} /></td></tr>
                                <tr><th>Opening*</th><td><select required name="opening" className="form-control" defaultValue={data.opening}><option></option>{openings.map((opening, i) => (<option selected={data.opening===opening?'selected':''} key={i}>{opening}</option>))}</select></td></tr>
                                <tr><th>Assignedto*</th><td><select required name="assignedto" defaultValue={data.assignedto} className="form-control"><option></option>{emps.map((emp, i) => (<option key={i} selected={data.assignedto===emp?'selected':''}>{emp}</option>))}</select></td></tr>
                            </tbody>
                        </table>
                        <button className="form-control btn btn-dark">Update</button>
                    </form>
                    <br />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => { return { state: state } }

export default connect(mapStateToProps, mapDispatchCandidate)(EditCandidate);