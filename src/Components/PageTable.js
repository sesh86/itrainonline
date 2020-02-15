import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
 import {NavLink} from 'react-router-dom';

class PageTable extends Component {
  constructor(props){
    super(props);
    this.state={enquiries:[]}
  }

  render() {
    console.log(this.props)
  let data=this.props.res;
  if(!data)
    data=[{cnt:0}];
  let header=this.props.header;
  // console.log(data)
  let count=data[0].cnt;
  // console.log(count)
  let rows,pages,sort,curr,order;
  if(this.props.options){
    rows=this.props.options.per_page;
    console.log(rows)
    pages=Math.ceil(count/rows);
    console.log(pages)
    curr=this.props.options.page;
    console.log(curr)
    sort=this.props.options.sort;
    order=this.props.options.order;
  }
  console.log(count)
    return (
      <div className="cat">
        <br/>
        Search<br/>
        <input type="text" defaultValue={this.props.searched} onKeyDown={this.props.searchFor}></input>        
        {data.length>0?
        <div>
        <br/>
        {count>0?<div>Total Results: {count}</div>:''}       
        {count>0?<GetPagination pages={pages} curr={curr} link={this.props.getPage}/>:null}        
        <Table className="table">
        <GetHeader header={header} sortBy={this.props.sortBy} sort={this.props.options.sortBy} order={this.props.options.order}/>
        {count>0?<GetBody body={data} link={this.props.link} header={header} ukey={this.props.ukey}/>:<tbody><tr><td>No Data</td></tr></tbody>}
        </Table>      
        {count>0?<div><GetPagination pages={pages} curr={curr} link={this.props.getPage}/>
        {count>0?<div>Total Results: {count}</div>:''}       </div>:null}
        </div>
        :
        <div>
        <Table className="table">
          <GetHeader header={Object.keys(header)} sortBy={this.props.sortBy} sort={sort} order={order}/>
          <tr><td>No Data</td></tr>
        </Table>      
        </div>        
        }
      </div>
    );
  }
}

const GetBody =(props)=>{
  console.log(props.ukey)
  return (<tbody>
      {props.body.map((val,i) => (<GetRow ukey={props.ukey} key={i} link={props.link} header={props.header} body={val}></GetRow>))}
      </tbody>);

}

const GetRow =(props)=>{
    let data=props.body,_id,header=props.header,link=props.link;
    if(header[0]==='_id') header.shift();
    _id=props.body[props.ukey];
    console.log(props.ukey)
    return (
        <tr>
        {header.map((field,i) => (
        <td key={i}><NavLink to={'/'+link+'/'+_id}>{data[field]}</NavLink></td>
        )
        )}
        </tr>
        );  
  }
const GetPagination=(props)=>{
  console.log(props)
  let pages=[];
  let curr=props.curr;

  if(curr===1 || curr ===2){let i=2;while(i<=props.pages && i<=curr+2){pages.push(i);i++;}}
  else if(props.pages===curr) pages=[curr-1,curr];
  else pages=[curr-1,curr,curr+1];

  return(<Pagination size="md" variant="secondary">
    {curr===1?<Pagination.First disabled/>:<Pagination.First onClick={()=>props.link(1)}/>}
    {curr===1?<Pagination.Prev disabled/>:<Pagination.Prev onClick={()=>props.link(curr-1)}/>}
    {curr===1?<Pagination.Item active>{1}</Pagination.Item>:<Pagination.Item onClick={()=>props.link(1)}>{1}</Pagination.Item>}
    {(curr!==1 && curr!==2)?<Pagination.Ellipsis/>:('')}
    {pages.map((page,i) =>(curr===page?<Pagination.Item key={i} active>{page}</Pagination.Item>:<Pagination.Item key={i} onClick={()=>props.link(page)}>{page}</Pagination.Item>))}
    {(curr!==(props.pages-1) && curr!==props.pages)?<Pagination.Ellipsis />:''}
    {(curr!==(props.pages-1) && curr!==props.pages)?<Pagination.Item onClick={()=>props.link(props.pages)}>{props.pages}</Pagination.Item>:('')}
    {curr!==props.pages?<Pagination.Next onClick={()=>props.link(curr+1)}/>:<Pagination.Next disabled/>}
    {curr!==props.pages?<Pagination.Last onClick={()=>props.link(props.pages)}/>:<Pagination.Last disabled/>}
    
  </Pagination>);
}
const GetHeader =(props)=>{
  let l_order;
  if(props.order==='asc')
    l_order='8593';
  else if(props.order==='desc')
    l_order='8595';
  return (<thead>
      <tr>
      {props.header.map((col,i) => (          
        <th key={i} onClick={()=>props.sortBy(i+1)}>{col}{(props.sort===i+2)?String.fromCharCode(l_order):''}</th>
      ))}
      </tr>
      </thead>);
}
export default PageTable;
