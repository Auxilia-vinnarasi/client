import { message,Row,Col,Form} from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import Bus from '../components/Bus';

function Home() {
  const dispatch=useDispatch();
const {user}=useSelector(state=>state.users);
const [buses,setBuses]=useState([]);
const [filters={},setFilters]=useState([]);

const getBuses=async()=>{
  //for filters if it has any values im gonna remove it..
  const tempFilters={}
  Object.keys(filters).forEach((key)=>{
    if(filters[key]){
      tempFilters[key]=filters[key];
    }
  })
  //because we should not send empty values
  try{
    dispatch(ShowLoading());
    const response=await axiosInstance.post("/api/buses/get-all-buses", tempFilters);
    dispatch(HideLoading());
    if(response.data.success){
      setBuses(response.data.data)
    }
    else{
      message.error(response.data.message);
    }
  }
  catch(err){
    console.log(err);
    dispatch(HideLoading());
    message.error(err.message);
  }
}

useEffect(()=>{
  getBuses();
},[]);

  return (
    <div>
      {/* {user && <h1>welcome {user?.name}</h1>}
      {user && <h3>{user.email}</h3>} */}
      <div className='my-3 card p-2'>
        {/* filter purpose */}
       <Row gutter={[10]}>
        <Col lg={6} sm={24}>
          <input type="text"
          placeholder="From"
          value={filters.from}
          onChange={(e)=>setFilters({...filters,from:e.target.value})}
          />    
        </Col>
        <Col lg={6} sm={24}>
          <input type="text"
          placeholder='To'
          value={filters.to}
          onChange={(e)=>setFilters({...filters,to:e.target.value})}
          />
        </Col>
        <Col lg={6} sm={24}>
          <input type="date"
          placeholder='Journey Date'
          value={filters.journeyDate}
          onChange={(e)=>setFilters({...filters,journeyDate:e.target.value})}/>
        </Col>
        <Col lg={6} sm={24}>
          <div className='d-flex gap-2'>
          <button className='primary-btn' onClick={()=>getBuses()}>Filter</button>
          <button className='primary-btn' onClick={()=>setFilters({
            from:"",
            to:"",
            journeyDate:""
          })}>Clear</button>
          </div>
          </Col>
       </Row>
      </div>
      <div>
        {/* displaying all the buses.. */}
        <Row gutter={[15,15]}>
          {buses.map((bus)=>(
            <Col lg={12} xs={24} sm={24}>
              {/* bus i have to pass the data */}
              <Bus bus={bus}/>
            </Col>
          ))}
        </Row>
      </div>
   
    </div>
  )
}

export default Home