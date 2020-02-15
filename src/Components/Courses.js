import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { mapDispatchCoursesList } from '../Reducer/action';
import {Card,CardHeader,CardTitle,CardBody} from 'reactstrap';
import {Breadcrumb} from 'react-bootstrap'
import {Link,NavLink } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination'
import radio from '../radio.gif'
class Courses extends Component {
  componentDidMount() {
      this.props.getCourses(this.state.options)
    }
    g_per_page=100;
  constructor(props) {    
    super(props);
    // if(!getCookie('jwt')) this.props.history.push('/login');
    
    let l_page=1
    console.log(l_page)
    this.g_per_page=this.props.per_page?this.props.per_page:100;
    this.state = {
      options: {"page":l_page,"per_page":this.g_per_page,"filter":null,"sort_by":11,"order":'asc'},
      res: { "count": 0, "data": [] },
    }
  }

  componentDidUpdate(){
    let l_page=1;
    let options=this.state.options;

    if(options['page']!==l_page){
        options['page']=l_page;
        this.setState({options:options});
        this.props.getCourses(this.state.options)
    }
  }
  render() {
      let courses=this.props.courses;
      let l_page=this.props.match?this.props.match.params.page:null;
    return (
      <div className="bg-course m-5">        
        {l_page!==null?<div className="bg">
            <Breadcrumb>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
    Web-Development
  </Breadcrumb.Item>
</Breadcrumb>
</div>:''}      
      
      <div className="row">
        {courses?courses.map((s,i)=>
          <div className="col-6 col-md-2  mt-3">
          <Card>
            <CardHeader className="">
            <CardTitle className="text-center"><div className="courseName">{s.course_name}</div></CardTitle>
              <div className="course_head img_div text-center"><img className="courseLogo" alt={""} src={"/img/"+s.logo}/></div>
            </CardHeader>
            <CardBody className="cardBody text-justify">
              
              <div dangerouslySetInnerHTML={{ __html: s.description+'...'}} /></CardBody>
                <Link className="form-control btn btn-darkblue" to={"/Course/"+s.course_name}>Read More</Link>
          </Card>
          </div>):<img alt={""} src={radio}/>}
          <div>
          
          </div>
        </div>
        

        {/* {(courses[0] && l_page!=null)?<GetPagination pages={Math.ceil(courses[0].cnt/this.g_per_page)} curr={this.state.options.page} link="/Courses/"/>:''} */}
        {l_page===null?<NavLink className="cta-btn" to='/Courses'>View all Courses </NavLink>:''}
        
      </div>
    );
  }
}

// const GetPagination=(props)=>{
//     let pages=[];
//     let curr=Number(props.curr);
  
//     if(curr===1 || curr ===2){let i=2;while(i<=props.pages && i<=curr+2){pages.push(i);i++;}}
//     else if(props.pages===curr) pages=[curr-1,curr];
//     else pages=[curr-1,curr,curr+1];
  
//     return(<Pagination size="md" variant="secondary">
//       {curr===1?<Pagination.First disabled/>:<Pagination.First><Link to={"/Courses"}>{'<<'}</Link></Pagination.First>}
//       {curr===1?<Pagination.Prev disabled/>:<Pagination.Prev><Link to={"/Courses/"+(curr-1)}>{'<'}</Link></Pagination.Prev>}
//       {curr===1?<Pagination.Item active>{1}</Pagination.Item>:<Pagination.Item><Link to={"/Courses/"+1}>{1}</Link></Pagination.Item>}

//       {(curr!==1 && curr!==2)?<Pagination.Ellipsis/>:('')}
//       {pages.map((page,i) =>(
//           curr===page?<Pagination.Item key={i} active>{page}</Pagination.Item>:<Pagination.Item key={i} ><Link to={"/Courses/"+page}>{page}</Link></Pagination.Item>
//           )
//       )}
//       {(curr!==(props.pages-1) && curr!==props.pages)?<Pagination.Ellipsis />:''}
//       {(curr!==(props.pages-1) && curr!==props.pages)?<Pagination.Item ><Link to={"/Courses/"+(props.pages)}>{props.pages}</Link></Pagination.Item>:('')}
// {curr!==props.pages?<Pagination.Next><Link to={"/Courses/"+(curr+1)}>{">"}</Link></Pagination.Next>:<Pagination.Next disabled/>}
//       {curr!==props.pages?<Pagination.Last><Link to={"/Courses/"+(props.pages)}>{">>"}</Link></Pagination.Last>:<Pagination.Last disabled/>}
      
//     </Pagination>);
//   }
const mapStateToProps = (state) => { return { courses: state.courses } }
export default connect(mapStateToProps, mapDispatchCoursesList)(Courses);