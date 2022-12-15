import { Col, message,Row} from 'antd';
import React, { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams} from 'react-router-dom';
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';


function BookNow() {
  const params=useParams();

  const dispatch=useDispatch();
  const[bus,setBus]=useState(null);

  const getBus=async()=>{
    try{
      dispatch(ShowLoading());
      const response=await axiosInstance.post("/api/buses/get-bus-by-id",{_id:params.id});
      dispatch(HideLoading());
      if(response.data.success){
        setBus(response.data.data)
      }
      else{
        message.error(response.data.message)
      }
    }
    catch(err){
      dispatch(HideLoading())
      message.error(err.message);
    }

  }

  useEffect(()=>{
    getBus()
  },[])

  return (
  <div>
   {bus &&  <Row className='mt-3'>
      {/* bus details */}
      <Col lg={12} xs={24} sm={24}>
        <h1 className='text-2xl text-secondary'>{bus.name}</h1>
        <h1 className='text-md'>{bus.from} - {bus.to}</h1>
        <hr/>
        <div>
          <h1 className='text-md mt-3'>Journey Date: {bus.journeyDate}</h1>
          <h1 className='text-md mt-2'>price: Rs.{bus.price}/-</h1>
          <h1 className='text-md mt-2'>Departure Time: {bus.departure}</h1>
          <h1 className='text-md mt-2'>Arrival Date: {bus.arrival}</h1>
          <hr/>
        </div>
        <div>
          <h1 className='text-md'>selected seats: {}</h1>
        </div>
        <div>
          <h1 className='text-md mt-4'>Total: </h1>
        </div>
        <div>
          <button className='btn-btn-secondary mt-3'>BookNow</button>
        </div>
      </Col>
      <Col lg={12} xs={24} sm={24}></Col>
     
    </Row>}
 
  </div>
  )
}

export default BookNow