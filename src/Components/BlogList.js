import {Breadcrumb} from 'react-bootstrap'
import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { mapDispatchBlogList } from '../Reducer/action';
import {Collapse,Card,CardHeader,CardTitle,CardBody} from 'reactstrap';
import {NavLink,Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination'

class BlogList extends Component {
  componentDidMount() {
      this.props.getBlogs(this.state.options)
  }
  constructor(props) {
    super(props);
    console.log(this.props.match);
    // if(!getCookie('jwt')) this.props.history.push('/login');
    
    let l_page=this.props.match?(this.props.match.params.page?this.props.match.params.page:1):1;
    this.state = {
      options: {"page":l_page,"per_page":4,"filter":null,"sort_by":11,"order":'asc'},
      res: { "count": 0, "data": [] },
    }
  }

  componentDidUpdate(){
    console.log(this.props.match);
    let l_page=this.props.match?(this.props.match.params.page?this.props.match.params.page:1):1;
    let options=this.state.options;

    if(options['page']!==l_page){
        options['page']=l_page;
        this.setState({options:options});
        this.props.getBlogs(this.state.options)
    }
  }
  render() {
      let l_page=this.props.match?(this.props.match.params.page?this.props.match.params.page:1):1;
      let l_param_page=this.props.match?(this.props.match.params.page?this.props.match.params.page:1):null;
      let blogs=this.props.blogs;
    return (
      <div className="m-5">        
        {l_param_page!==null?<div className="bg">
            <Breadcrumb>
  <Breadcrumb.Item><NavLink to="/">Home</NavLink></Breadcrumb.Item>
  <Breadcrumb.Item>
  <NavLink to="/BlogList">Blogs</NavLink>
  </Breadcrumb.Item>
</Breadcrumb>
</div>:''}          
      <div className="row">
        {blogs.map((s,i)=>
          <div className="col-12 col-md-3">
          <Card>
            <CardHeader className="bg-darkblue">
              <CardTitle>{s.title}</CardTitle>
            </CardHeader>
            <CardBody className="text-justify">
                <div className="img_div">
                <img src={"/img/"+s.image} class="blog_img" alt="Responsive image"/>
                </div>
                <span dangerouslySetInnerHTML={{ __html: s.blog}} /><Link to={"/blog/"+s.title}>Read More</Link>
                </CardBody>
          </Card>
          </div>)}
          <div>
          
          </div>
        </div>
        <br/>          
        {(blogs[0] && l_param_page!=null)?<GetPagination pages={Math.ceil(blogs[0].cnt/4)} curr={l_page} link="/blog/"/>:''}
        {l_param_page===null?<NavLink className="cta-btn" to='/BlogList'>View all Courses </NavLink>:''}
        <br/>          
        <br/>                  
      </div>
    );
  }
}

const GetPagination=(props)=>{
    let pages=[];
    let curr=Number(props.curr);
  
    if(curr===1 || curr ===2){let i=2;while(i<=props.pages && i<=curr+2){pages.push(i);i++;}}
    else if(props.pages===curr) pages=[curr-1,curr];
    else pages=[curr-1,curr,curr+1];
  
    return(<Pagination size="md" variant="secondary">
      {curr===1?<Pagination.First disabled/>:<Pagination.First><Link to={"/BlogList/1"}>{'<<'}</Link></Pagination.First>}
      {curr===1?<Pagination.Prev disabled/>:<Pagination.Prev><Link to={"/BlogList/"+(curr-1)}>{'<'}</Link></Pagination.Prev>}
      {curr===1?<Pagination.Item active>{1}</Pagination.Item>:<Pagination.Item><Link to={"/BlogList/"+1}>{1}</Link></Pagination.Item>}

      {(curr!==1 && curr!==2)?<Pagination.Ellipsis/>:('')}
      {pages.map((page,i) =>(
          curr===page?<Pagination.Item key={i} active>{page}</Pagination.Item>:<Pagination.Item key={i} ><Link to={"/BlogList/"+page}>{page}</Link></Pagination.Item>
          )
      )}
      {(curr!==(props.pages-1) && curr!==props.pages)?<Pagination.Ellipsis />:''}
      {(curr!==(props.pages-1) && curr!==props.pages)?<Pagination.Item ><Link to={"/BlogList/"+(props.pages)}>{props.pages}</Link></Pagination.Item>:('')}
{curr!==props.pages?<Pagination.Next><Link to={"/BlogList/"+(curr+1)}>{">"}</Link></Pagination.Next>:<Pagination.Next disabled/>}
      {curr!==props.pages?<Pagination.Last><Link to={"/BlogList/"+(props.pages)}>{">>"}</Link></Pagination.Last>:<Pagination.Last disabled/>}
      
    </Pagination>);
  }
const mapStateToProps = (state) => { return { blogs: state.blogs } }
export default connect(mapStateToProps, mapDispatchBlogList)(BlogList);