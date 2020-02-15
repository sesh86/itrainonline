import axios from 'axios';
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState,convertToRaw,ContentState,convertFromHTML} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../App.css';

class CreatePosition extends Component {
  componentDidMount() {
    //   this.props.getBlogs(this.state.options)
  }
  constructor(props) {
      super(props);
      this.state={error:'',success:'',editorState : EditorState.createEmpty(),}
  }
  onSubmit =(e)=>{
    e.preventDefault();
    let data = new FormData();
    // let log={};
    for(let i in e.target.elements){
        if(e.target.elements[i].value!==undefined && e.target.elements[i].value!==""){
            data.append(e.target.elements[i].name,e.target.elements[i].value);
            // log[e.target.elements[i].name]=e.target.elements[i].value
            // data[e.target.elements[i].name]=e.target.elements[i].value;
        }
    }
    // console.log(data)
    // const files=this.state.files;
    // if(files[0]) data.append('cert1',files[0]);
    // if(files[1]) data.append('cert2',files[1]);
    let currentComponent=this;

    axios.post('/createPosition', data)
    .then(function (res) {
      console.log(res)
      currentComponent.setState({success:'Form Successfully submitted'})
      currentComponent.props.history.push('/Positions');
    })    
  }
  onEditorStateChange = editorState => {this.setState({ editorState });};
  render(){
    let fileNames=this.state.fileNames,success=this.state.success;
    const { editorState } = this.state;
      return(
    <div className="container msg">
    <h1>Create New Position</h1>
    {success===''?
    <form onSubmit={this.onSubmit}>
        Designation<span className="mandatory">*</span><input required className="form-control" type="text" name="designation" placeholder="Designation"></input><br/>
        Company<input required className="form-control" type="text" name="company" placeholder="Company"></input><br/>        
        Primary Skills<input required className="form-control" type="text" name="primary_skills" placeholder="Primary Skills"></input><br/>
        Secondary Skills<input required className="form-control" type="text" name="secondary_skills" placeholder="Secondary Skills"></input><br/>
        Job Description
        <Editor name="courseRich"
          initialEditorState={editorState}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
          ref="draftRef"/>
          <textarea value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} className="form-control" hidden name="job_description"/>        
        Min Experience<span className="mandatory">*</span><input required className="form-control" type="text" name="min_experience" placeholder="Min Experience"></input><br/>
        Max Experience<input className="form-control" type="text" name="max_experience" placeholder="Max Experience"></input><br/>
        Min Budget<input className="form-control" type="text" name="min_budget" placeholder="Min Budget"></input><br/>
        Max Budget<input className="form-control" type="text" name="max_budget" placeholder="Max Budget"/>
        Location<input className="form-control" type="type" name="location" placeholder="Location"/>
        <br/>
        {this.state.error!=''?<div className="alert alert-danger">{this.state.error}</div>:''}
        <button className="form-control btn btn-darkblue">Submit</button>      
    </form>:
  <div className="alert alert-success">{success}</div>
    }

    <br/>
    </div>)
  }
}

const mapStateToProps = (state) => { return { blogs: state.blogs }}
export default CreatePosition;