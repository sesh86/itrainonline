import React, { Component } from 'react';
import {Collapse, Button,Card,CardHeader,CardTitle,CardBody} from 'reactstrap';
import axios from 'axios';
// import Authenticate from './Authenticate';
import {Input} from 'reactstrap'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState,convertToRaw,ContentState,convertFromHTML} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
class CreateCourse extends Component {
  constructor(props) {
    super(props);

    // Authenticate(this);
    this.state = {
      editorState : EditorState.createEmpty(),
      editorState1: EditorState.createEmpty(),
      editorState2: EditorState.createEmpty(),
      editorState3: EditorState.createEmpty(),
      editorState4: EditorState.createEmpty(),
      isOpen: false,
      sylabus:[],
      FAQs:[]
    };
    // if(this.props.location.pathname!=='/CreateCourse'){
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

  toggle=() => {
    this.setState({isOpen: !this.state.isOpen});
  }
  addFAQ=(ev)=> {
    ev.preventDefault();
    console.log('here')
    console.log(ev.target.elements)
    let FAQs=this.state.FAQs;

    // for(let i in ev.target.elements){
      FAQs.push({topic:ev.target.elements[0].value,content:ev.target.elements[1].value});
    // }
    console.log(FAQs)
    ev.target.elements[0].value=''
    ev.target.elements[1].value=''
    this.setState({FAQs:FAQs,editorState4:EditorState.createEmpty()})
  }  
  onclick=(ev)=> {
    ev.preventDefault();
    console.log('here')
    console.log(ev.target.elements)
    let sylabus=this.state.sylabus;

    // for(let i in ev.target.elements){
      sylabus.push({topic:ev.target.elements[0].value,content:ev.target.elements[1].value});
    // }
    console.log(sylabus)
    ev.target.elements[0].value=''
    ev.target.elements[1].value=''
    this.setState({sylabus:sylabus,editorState1:EditorState.createEmpty()})
  }
  onSubmit=(ev)=> {
    ev.preventDefault();
    // let courseJSON={}
    let currentComponent = this;
    let data = new FormData();
    for(let i in ev.target.elements){
      if(ev.target.elements[i].value!==undefined && ev.target.elements[i].value!==""){
      data.append(ev.target.elements[i].name,ev.target.elements[i].value);
    }
    }
    console.log(data);
    // return;
    data.append('course_sylabus',JSON.stringify(this.state.sylabus))
    data.append('faq',JSON.stringify(this.state.FAQs))
    data.append('logo','/static/img/'+ev.target.elements.logo.files[0].name)
    // courseJSON['course_sylabus']=this.state.sylabus;
    // courseJSON['faq']=this.state.FAQs;

    // if(this.props.location.pathname==='/CreateCourse'){
      // courseJSON['logo']='/static/img/'+ev.target.elements.logo.files[0].name;
      data.append('file', this.uploadInput.files[0]);
    // }
    // data.append('filename', this.fileName.value);
    // data.append('courseJSON',JSON.stringify(courseJSON));
    // console.log(courseJSON);
    // console.log(data.courseJSON);
    axios.post('/createCourse', data)
    .then(function (response) {
      currentComponent.setState({ imageURL: '', uploadStatus: true });
      currentComponent.props.history.push('/Courses');
    })
    .catch(function (error) {
      console.log(error);
    });    

  }
  onEditorStateChange = editorState => {this.setState({ editorState });};
  onEditorStateChange1 = editorState1 => {this.setState({ editorState1 });};
  // onEditorStateChange2 = editorState2 => {this.setState({ editorState2 });};
  // onEditorStateChange3 = editorState3 => {this.setState({ editorState3 });};
  onEditorStateChange4 = editorState4 => {this.setState({ editorState4 });};

  render() {
    const { FAQs,sylabus,editorState,editorState1,editorState4 } = this.state;
    

    // if(!this.state.course) return <div className="body container">Loading...</div>;

    return (
      <div className="container">
        <br/>
        <div className="row">
          <div className="col-sm-12 col-md-2"><button type="button" className="btn btn-darkblue btn-block">Back</button></div>
        </div>
        <br/>
        {sylabus.map((s,i)=>
          <Card>
            <CardHeader className="bg-darkblue">
              <CardTitle>{s.topic}</CardTitle>
            </CardHeader>
            <CardBody className="text-justify"><div dangerouslySetInnerHTML={{ __html: s.content}} /></CardBody>
          </Card>)}

        <form onSubmit={this.onclick}>
          Topic<Input type="text" name="topic"  className="form-control"/>
          Course Syllabus
          <Editor name="courseRich"
          initialEditorState={editorState1}
          editorState={editorState1}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange1}
          ref="draftRef"/>
          <textarea value={draftToHtml(convertToRaw(editorState1.getCurrentContent()))} className="form-control" hidden name="sylabus"/>
          <br/>
          <button className="form-control btn btn-darkblue">Add Syllabus</button>
        </form>

        <br/>
        {FAQs.map((s,i)=>
          <Card>
            <CardHeader className="bg-darkblue">
              <CardTitle>{s.topic}</CardTitle>
            </CardHeader>
            <Collapse>
            <CardBody className="text-justify"><div dangerouslySetInnerHTML={{ __html: s.content}} /></CardBody>
            </Collapse>
          </Card>)}

        <form onSubmit={this.addFAQ}>
          Question<Input type="text" name="topic"  className="form-control"/>
          Answer
          <Editor name="courseRich"
          initialEditorState={editorState4}
          editorState={editorState4}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange4}
          ref="draftRef"/>
          <textarea value={draftToHtml(convertToRaw(editorState4.getCurrentContent()))} className="form-control" hidden name="FAQ"/>
          <br/>
          <button className="form-control btn btn-darkblue">Add FAQ</button>
        </form>
        <h1>Create New Course</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          Course Name<Input type="text" name="course_name"  className="form-control" defaultValue={this.state.course?this.state.course.courseName:''}/>
          Category   <Input type="text" name="category"    className="form-control" defaultValue={this.state.course?this.state.course.category:''}/>
          Demo URL   <Input type="text" name="demo_url"    className="form-control" defaultValue={this.state.course?this.state.course.demo:''}/>
        Title   <Input type="text" name="title"    className="form-control" defaultValue={this.state.course?this.state.course.title:''}/>
      Keywords   <Input type="text" name="keywords"    className="form-control" defaultValue={this.state.course?this.state.course.keywords:''}/>
      Description   <Input type="text" name="description"    className="form-control" defaultValue={this.state.course?this.state.course.description:''}/>
      Course Fee   <Input type="number" name="course_fee"    className="form-control" defaultValue={this.state.course?this.state.course.fee:''}/>
    Discounted Fee   <Input type="number" name="discounted_fee"    className="form-control" defaultValue={this.state.course?this.state.course.disc:''}/>
          Course Details
                      <Editor name="courseRich"
                      toolbarClassName="toolbarClassName"
                      initialEditorState={editorState}
                      editorState={editorState}
                      wrapperClassName="wrapperClassName cDetails"
                      editorClassName="editorClassName"
                      onEditorStateChange={this.onEditorStateChange }
                      ref="draftRef"/>
                    <textarea name="course_details" disabled
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
          Course Duration<input name="duration" type="text" className="form-control" defaultValue={this.state.course?this.state.course.duration:''}/>
          LMS<input type="text" name="lms" className="form-control" defaultValue={this.state.course?this.state.course.lms:''}/>
          Live Project<input type="text" name="live_project" className="form-control" defaultValue={this.state.course?this.state.course.liveProject:''}/>
          Pre Requisites<input type="text" name="pre_requisites" className="form-control" defaultValue={this.state.course?this.state.course.preRequisites:''}/>
          Logo
          <input id="sesh" type="file" name="logo" className="form-control form-control-file" ref={(ref) => { this.uploadInput = ref; }} />
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

export default CreateCourse;
