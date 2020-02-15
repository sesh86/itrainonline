import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { mapDispatchPositions } from '../Reducer/action';
import {Card,CardHeader,CardTitle,CardBody} from 'reactstrap';
// import {Breadcrumb} from 'react-bootstrap'
import {Link,NavLink } from 'react-router-dom';
// import Pagination from 'react-bootstrap/Pagination'
import radio from '../radio.gif'
class Positions extends Component {
  componentDidMount() {
      this.props.getPositions(this.state.options)
    }
    g_per_page=100;
  constructor(props) {    
    super(props);
    // if(!getCookie('jwt')) this.props.history.push('/login');
    
    let l_page=1
    console.log(l_page)
    this.g_per_page=this.props.per_page?this.props.per_page:100;
    this.state = {
      options: {"page":l_page,"per_page":this.g_per_page,company:"",primary_skills:"",min_exp:"",max_exp:"",min_budget:"","filter":null,"sort_by":11,"order":'asc'},
      res: { "count": 0, "data": [] },
    }
  }

  componentDidUpdate(){
    let l_page=1;
    let options=this.state.options;

    if(options['page']!==l_page){
        options['page']=l_page;
        this.setState({options:options});
        this.props.getPositions(this.state.options)
    }
  }
  render() {
      console.log('render')
      let positions=this.props.positions;
      let l_page=this.props.match?this.props.match.params.page:null;
    return (
      <div className="bg-position m-5">        
        {l_page!==null?'':''}      
      
      <div className="row">
        {positions?positions.map((s,i)=>
          <div className="col-12 col-md-3  mt-3">
          <Card>
            <CardHeader className="">
        <CardTitle className="text-center"><h5>{s.company}</h5><span>{s.designation}</span></CardTitle>
            </CardHeader>
            <CardBody className="position-body">
            <b className="mr-1">Skills:</b>{s.primary_skills}<br/>
            <b className="mr-1">Good to have:</b>{s.secondary_skills}<br/>
        <b className="mr-1">Experience: </b>{""+s.min_experience+" - "+s.max_experience+" Years"}<br/>
        <b className="mr-1">Salary:</b>{""+s.min_budget+" - "+s.max_budget+" Lacs per annum"}
              <div dangerouslySetInnerHTML={{ __html: s.job_description+'...'}} />
              </CardBody>
                <Link className="form-control btn btn-darkblue" to={"/Position/"+s.position_name}>Apply</Link>
          </Card>
          </div>):<img alt={""} src={radio}/>}
          <NavLink to="/CreatePosition"><h1 className="fixed-bottom"><i className="text-success display-3 fa fa-plus-circle"></i></h1></NavLink>
          <div>
          
          </div>
        </div>
        

        {/* {(positions[0] && l_page!=null)?<GetPagination pages={Math.ceil(positions[0].cnt/this.g_per_page)} curr={this.state.options.page} link="/Positions/"/>:''} */}
        {l_page===null?<NavLink className="cta-btn" to='/Positions'>View all Positions </NavLink>:''}
        
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
//       {curr===1?<Pagination.First disabled/>:<Pagination.First><Link to={"/Positions"}>{'<<'}</Link></Pagination.First>}
//       {curr===1?<Pagination.Prev disabled/>:<Pagination.Prev><Link to={"/Positions/"+(curr-1)}>{'<'}</Link></Pagination.Prev>}
//       {curr===1?<Pagination.Item active>{1}</Pagination.Item>:<Pagination.Item><Link to={"/Positions/"+1}>{1}</Link></Pagination.Item>}

//       {(curr!==1 && curr!==2)?<Pagination.Ellipsis/>:('')}
//       {pages.map((page,i) =>(
//           curr===page?<Pagination.Item key={i} active>{page}</Pagination.Item>:<Pagination.Item key={i} ><Link to={"/Positions/"+page}>{page}</Link></Pagination.Item>
//           )
//       )}
//       {(curr!==(props.pages-1) && curr!==props.pages)?<Pagination.Ellipsis />:''}
//       {(curr!==(props.pages-1) && curr!==props.pages)?<Pagination.Item ><Link to={"/Positions/"+(props.pages)}>{props.pages}</Link></Pagination.Item>:('')}
// {curr!==props.pages?<Pagination.Next><Link to={"/Positions/"+(curr+1)}>{">"}</Link></Pagination.Next>:<Pagination.Next disabled/>}
//       {curr!==props.pages?<Pagination.Last><Link to={"/Positions/"+(props.pages)}>{">>"}</Link></Pagination.Last>:<Pagination.Last disabled/>}
      
//     </Pagination>);
//   }
const mapStateToProps = (state) => { return { positions: state.positions } }
export default connect(mapStateToProps, mapDispatchPositions)(Positions);