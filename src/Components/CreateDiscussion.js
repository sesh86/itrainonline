import React, { Component } from 'react';
import {Collapse, Button,Card,CardHeader,CardTitle,CardBody} from 'reactstrap';
import axios from 'axios';
// import Authenticate from './Authenticate';
import {Input} from 'reactstrap'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState,convertToRaw,ContentState,convertFromHTML} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
class CreateDiscussion extends Component {
  componentDidMount(){  
    // axios.post('/getdiscussion',{"title":"Hey Vivek"},'{}')
    // .then(res=>{    
    //     console.log(res)
    // });    
  }
  constructor(props) {
    super(props);

    // Authenticate(this);
    this.state = {
      editorState : EditorState.createEmpty(),
      discussion:[]
    };
    // if(this.props.location.pathname!=='/CreateDiscussion'){
    //   axios('/getCourse/'+this.props.match.params.param)
    //   .then(res=>{
    //     this.setState({
    //     course:res.data[0],
    //     editorState:EditorState.createWithContent(this.getHTML(res.data[0].courseDetails)),
    //     editorState1:EditorState.createWithContent(this.getHTML(res.data[0].syllabus)),
    //     editorState2: res.data[0].batch!=="<p></p>\n"?EditorState.createWithContent(this.getHTML(res.data[0].batch)):EditorState.createEmpty(),
    //     editorState3:res.data[0].reviews!=="<p></p>\n"?EditorState.createWithContent(this.getHTML(res.data[0].reviews)):EditorState.createEmpty(),
    //     editorState4: res.data[0].FAQ!=="<p></p>\n"?EditorState.createWithContent(this.getHTML(res.data[0].FAQ)):EditorState.createEmpty(),
    //   })
    // });
    // }
  }

  getHTML=(data)=>{
    if(data==="<p></p>\n") return EditorState.createEmpty();
    const blocksFromHTML = convertFromHTML(data);
    const content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks,blocksFromHTML.entityMap);
    return content;
  }

  onSubmit=(ev)=> {
    ev.preventDefault();
    let courseJSON={}
    let currentComponent = this;

    for(let i in ev.target.elements){
      if(ev.target.elements[i].value!==undefined && ev.target.elements[i].value!=="")
        courseJSON[ev.target.elements[i].name]=ev.target.elements[i].value;
    }
    const data = new FormData();

    // if(this.props.location.pathname==='/CreateDiscussion'){
      courseJSON['image']='/static/img/'+ev.target.elements.image.files[0].name;
      data.append('file', this.uploadInput.files[0]);
    // }
    // data.append('filename', this.fileName.value);
    data.append('courseJSON',JSON.stringify(courseJSON));

    axios.post('/CreateDiscussion', data)
    .then(function (response) {
    //   currentComponent.setState({ imageURL: '', uploadStatus: true });
    //   currentComponent.props.history.push('/CourseList');
    })
    .catch(function (error) {
      console.log(error);
    });    
  }
  onEditorStateChange = editorState => {this.setState({ editorState });};
  
  render() {
    const {discussion,editorState} = this.state;
    

    // if(!this.state.course) return <div className="body container">Loading...</div>;

    return (
      <div className="container">
        <h1>Create New discussion</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          Title<Input type="text" name="title"  className="form-control" defaultValue={this.state.course?this.state.course.courseName:''}/>
          discussion
                      <Editor name="courseRich"
                      toolbarClassName="toolbarClassName"
                      initialEditorState={editorState}
                      editorState={editorState}
                      wrapperClassName="wrapperClassName cDetails"
                      editorClassName="editorClassName"
                      onEditorStateChange={this.onEditorStateChange }
                      ref="draftRef"/>
                    <textarea name="content" disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} className="form-control" hidden/>
          {/* Batch
          <Editor name="batchRich"
          initialEditorState={editorState2}
          editorState={editorState2}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange2}
          ref="draftRef"/>
          <textarea value={draftToHtml(convertToRaw(editorState2.getCurrentContent()))} className="form-control" hidden name="batch"/>
          Reviews
          <Editor name="reviewsRich"
          initialEditorState={editorState3}
          editorState={editorState3}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange3}
          ref="draftRef"/>
          <textarea value={draftToHtml(convertToRaw(editorState3.getCurrentContent()))} className="form-control" hidden name="reviews"/>
          FAQ
          <Editor name="FAQRich"
          initialEditorState={editorState4}
          editorState={editorState4}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange4}
          ref="draftRef"/>
          <textarea value={draftToHtml(convertToRaw(editorState4.getCurrentContent()))} className="form-control" hidden name="FAQ"/> */}
          Author<input name="author" type="text" className="form-control" defaultValue={this.state.discussion?this.state.discussion.author:''}/>
          Image
          <input type="file" name="image" className="form-control form-control-file" ref={(ref) => { this.uploadInput = ref; }} />
          <br/>
          <br/>
          <button className="form-control btn btn-darkblue">Submit</button>
          {/* <button className="form-control btn btn-darkblue" onClick={this.onclick}>Add Syllabus</button> */}
          </div>
        </form>

      </div>
)
}
}

export default CreateDiscussion;