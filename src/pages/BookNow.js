import { Col, message,Row} from 'antd';
import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';
import SeatSelection from '../components/SeatSelection';
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';


function BookNow() {
  const[selectedSeats,setSelectedSeats]=useState([]);
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
   {bus &&  (<Row className='mt-3' gutter={20}>
      {/* bus details */}
      <Col lg={12} xs={24} sm={24}>
        <h1 className='text-2xl text-secondary'>{bus.name}</h1>
        <h1 className='text-md'>{bus.from} - {bus.to}</h1>
        <hr/>
        <div>
          <h1 className='text-md mt-3'><b>Journey Date:</b> {bus.journeyDate}</h1>
          <h1 className='text-md mt-3'><b>price:</b> Rs.{bus.price}/-</h1>
          <h1 className='text-md mt-3'><b>Departure Time:</b> {bus.departure}</h1>
          <h1 className='text-md mt-3'><b>Arrival Date:</b>{bus.arrival}</h1>
          <hr/>
        </div>
        <div>
          <h1 className='text-md'><b>Selected Seats:</b> {}</h1>
        </div>
        <div>
          <h1 className='text-md mt-4'>Total: </h1>
        </div>
        <div>
          <button className='btn-btn-secondary mt-3'>Book Now</button>
        </div>
      </Col>
      <Col lg={12} xs={24} sm={24}>
        <SeatSelection
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        bus={bus}
        />
      </Col>
     
    </Row>)}
 
  </div>
  )
}

export default BookNow