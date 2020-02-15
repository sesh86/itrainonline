import React, { Component } from 'react';
import {Navbar,Nav,Accordion,Card,Row,Col,Container,Breadcrumb} from 'react-bootstrap'
import axios from 'axios';
import radio from '../radio.gif'
import {NavLink } from 'react-router-dom';
import {Helmet} from "react-helmet";

class Position extends Component {
    constructor(props) {
        super(props);
        this.state = {
          position:{}
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        let l_data={position:this.props.match.params.position}
          axios.post('/getPosition',l_data,'{}')
          .then(res=>{    
              this.setState({position:res.data})              
          });
      }    
      componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }      
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight,video:window.innerWidth*0.7 });
      }      
    render()
    {
        let position=this.state.position;
        console.log(position)
        let sylabus=position.position_name?JSON.parse(position.position_sylabus):[];
        let FAQs=position.position_name?JSON.parse(position.faq):[];
        console.log(sylabus);

        return(
        <div>
          <Helmet>
              <title>{""+position.title} </title>
              <meta name="description" content={position.description} />
          </Helmet>                      
            {position.length>0?<img src={radio} alt={""} />:''}
        <div className="cover">
            <div className="bgi"></div>
            <Breadcrumb>
  <Breadcrumb.Item><NavLink to="/">Home</NavLink></Breadcrumb.Item>
  <Breadcrumb.Item><NavLink to="/">{position.category}</NavLink></Breadcrumb.Item>
    <Breadcrumb.Item active><img width="25" alt={""} src={"/img/"+position.logo} className="justify-content-center"></img>{position.position_name}</Breadcrumb.Item>
</Breadcrumb>
<Container>
<Row className="justify-content-md-left">
    <Col md="auto">
    <Card>
        <Card.Body className="bg">
        <iframe  className="full" height="210" src={position.demo_url} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Card.Body>
        <Card.Footer>
            <button className="btn full btn-darkblue">Enroll Today</button>
        </Card.Footer>
    </Card>
    <br/><br/>
    
</Col>
<Col>
<Card className="dark-text">
        <Card.Header><strong>About {position.position_name} Training</strong></Card.Header>
      <Card.Body className="about">{position.description}</Card.Body>
      <Card.Footer><Row className="text-center">
    <Col>
        <i className="fa fa-info-circle"></i><span className="ml-1">Duration: {position.duration} Hours</span>
    </Col>
    <Col>
        <i className="fa fa-info-circle"></i><span className="ml-1">Prequisites: {position.pre_requisites}</span>
    </Col>    
    <Col>
        <i className="fa fa-info-circle"></i><span className="ml-1">Language: English</span>
    </Col>        
</Row></Card.Footer>
</Card>
<div>

</div>

<br/>
</Col>
</Row>
</Container>
</div>
<Navbar sticky="top" bg="dark" variant="dark" id="navbar-example2">
    <Nav>
      <Nav.Link data-spy="scroll" data-target="#position_details" href="#position_details">Position Details</Nav.Link>
      <Nav.Link href="#sylabus">Syllabus</Nav.Link>
      <Nav.Link href="#faq">FAQs</Nav.Link>
    </Nav>
</Navbar>
<br/>
<div id="position_details" className="mr-5 ml-5">
            <Card>
                <Card.Body>
        <div dangerouslySetInnerHTML={{__html:position.position_details}}/>
        </Card.Body>
        </Card>
</div>
            <br/>
            <div data-spy="scroll" data-target="#navbar-example2">
            <Card id="sylabus" className="mr-5 ml-5">
                <Card.Header className="bg-darkblue">
            <strong>Syllabus</strong>
            </Card.Header>
            <Card.Body>
            <Accordion defaultActiveKey="0">
                {sylabus.map((c,i)=>
                    <Card key={i}>
                    <Accordion.Toggle as={Card.Header} eventKey={i} title="Click to Expand">
                    <span>&#10149;&nbsp;&nbsp;</span>{c.topic}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={i}>
                <Card.Body><span dangerouslySetInnerHTML={{ __html: c.content}} /></Card.Body>
                    </Accordion.Collapse>
                    </Card>                    
                    )}
            </Accordion>
            </Card.Body>
            </Card>
            <Card id="faq" className="mr-5 ml-5">
                <Card.Header className="bg-darkblue">FAQs</Card.Header>
            <Card.Body>
            <Accordion defaultActiveKey="0">
                {FAQs.map((c,i)=>
                    <Card key={i}>
                    <Accordion.Toggle as={Card.Header} eventKey={i} title="Click to Expand">
                    <span>&#10149;&nbsp;&nbsp;</span>{c.topic}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={i}>
                <Card.Body><span dangerouslySetInnerHTML={{ __html: c.content}} /></Card.Body>
                    </Accordion.Collapse>
                    </Card>                    
                    )}
            </Accordion>
            </Card.Body>
            </Card>    
            </div>        
            <Container>
               
        </Container>
</div>);
    }
}

export default Position;