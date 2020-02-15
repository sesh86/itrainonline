import React, { Component } from 'react';

import axios from 'axios';
class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog:{}
    };
    let l_data={title:this.props.match.params.title}
      axios.post('/getBlog',l_data,'{}')
      .then(res=>{    
          this.setState({blog:res.data})
          console.log(res)
      });

  }

  render() {
    const { blog } = this.state;

    // if(!this.state.course) return <div className="body container">Loading...</div>;

    return (
<div className="container">
    <h1>{blog.title}</h1>
  <span>written by {blog.author}</span>
  <br/>
  <img src={"/img/"+blog.image} class="blog_img img-fluid" alt="Responsive image"/>
    <div dangerouslySetInnerHTML={{ __html: blog.blog}}></div>
  </div>
)
}
}

export default Blog;