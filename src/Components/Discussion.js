import React, { Component } from 'react';

import axios from 'axios';
class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        discussion:{}
    };
    let l_data={title:this.props.match.params.title}
      axios.post('/getDiscussion',l_data,'{}')
      .then(res=>{    
          this.setState({discussion:res.data})
          console.log(res)
      });

  }

  render() {
    const { discussion } = this.state;

    // if(!this.state.course) return <div className="body container">Loading...</div>;

    return (
<div className="container">
    <h1>{discussion.title}</h1>
  <span>written by {discussion.author}</span>
  <br/>
  <img src={"/img/"+discussion.image} class="blog_img img-fluid" alt="Responsive image"/>
    <div dangerouslySetInnerHTML={{ __html: discussion.content}}></div>
  </div>
)
}
}

export default Discussion;