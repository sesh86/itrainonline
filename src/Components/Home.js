import { connect } from 'react-redux'
import React, { Component } from 'react';
import { mapDispatchHome } from '../Reducer/action';
import {NavLink } from 'react-router-dom';
import Courses from './Courses';
import BlogList from './BlogList';
import axios from 'axios';
import radio from '../radio.gif'
import {Helmet} from "react-helmet";

class Home extends Component {
    componentDidMount(){
      this.props.getCategories();
    }
    state={courses:[]}
    handleKeyPress = (e) => {
        if(e.target.value.length<3) return;

        axios.post('/searchCourse?course='+e.target.value)
        .then(res=>{    
            this.setState({courses:res.data}) 
        });
    }
    render()
    {
        let courses=this.state.courses,category=this.props.categories;
        console.log(category)
        return(      
        <div>
          <Helmet>
              <title>iTrain Technologies | Experience a real technology experience</title>
              <meta name="description" content="iTrain Technologies | Experience a real technology experience" />
          </Helmet>          
          <div className="search">
        <h1 className="mt-5 text-center text">Experience a real technology experience</h1>
        <div className="text text-center">Technologies simplified at iTrain Technologies. No Fuss, Simply Learn</div>
        <br/>
        <div className="input-group container">
            <input type="text" className="form-control" placeholder="Search" onKeyUp={this.handleKeyPress} />
            <span className="input-group-addon hand"><i className="fa fa-search"></i></span>
        </div>
        <div className="container">
        <ul className="list-group dark-text" id="myUL">
          {courses?courses.map((course,index) =>(
          <li key={index} className="list-group-item"><NavLink title={"Check "+course.course_name} className="dark-text" to={"/Course/"+course.course_name}>{course.course_name}</NavLink></li>)):<img alt="" src={radio}/>
        }
        </ul>
        </div>
        <div>
          <div className="text text-center m-3"><span>Top Categories:</span>
          {category?category.map((cat,index) =>(
            <NavLink className="text" to={"/Category/"+cat.category} key={index}><div className="d-lg-inline-block category" > {cat.category}</div></NavLink>
          )):<img alt="" src={radio}/>}
          </div>
        </div>
      </div>      
      <section id="call-to-action" className="wow fadeIn">
      <div className="container text-center">
        <h3>Want to Upgrade your Tech Skills?</h3>
        <p>Learn with experienced Industry Veterans. Get Handson with our live projects. Have a life long technical support from our trainers.</p>
        <NavLink className="cta-btn" to='/Courses'>View all Courses </NavLink>
      </div>
    </section>      
    <Courses per_page="6"></Courses>
    <section id="call-to-action" className="wow fadeIn">
      <div className="container text-center">
        <h3>Have a great learning experience with iTrain Technologies</h3>
        <p>Our trainers are seasoned professionals who come with years of practice in cutting edge technologies and with great minds.</p>
        <NavLink className="cta-btn" to='/Courses'>View all Courses </NavLink>
      </div>
    </section>          
      <BlogList></BlogList>
      {/* <Discussions></Discussions> */}
      </div>)
}
}

const mapStateToProps = (state) => { return { categories: state.categories } }
export default connect(mapStateToProps, mapDispatchHome)(Home);