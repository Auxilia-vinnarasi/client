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

  const BookNow=async ()=>{
    try{
      dispatch(ShowLoading())
      //bus,and seats from front end,userid and trsansaction will be attached in the backend
      const response=await axiosInstance.post("/api/bookings/book-seat",{
        bus:bus._id,
        seats:selectedSeats,
      })
      dispatch(HideLoading());
      if(response.data.success){
        message.success(response.data.message);
      }
      else{
        dispatch(HideLoading());
        message.error(response.data.message);
      }
    }
    catch(err){
        console.log(err);
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
        <div className='flex flex-col gap-1'>
          <h1 className='text-md mt-3'><b>Journey Date:</b> {bus.journeyDate}</h1>
          <h1 className='text-md mt-3'><b>price:</b> Rs.{bus.price}/-</h1>
          <h1 className='text-md mt-3'><b>Departure Time:</b> {bus.departure}</h1>
          <h1 className='text-md mt-3'><b>Arrival Time:</b> {bus.arrival}</h1>
          <h1 className='text-md mt-3'><b>Capacity:</b> {bus.capacity}</h1>
          <h1 className='text-md mt-3'><b>Seats Left:</b> {bus.capacity-bus.seatsBooked.length}</h1>
          <hr/>
        </div>
        <div className='flex flex-col gap-1'>
          <h1 className='text-xl mt-3'><b>Selected Seats:</b> {selectedSeats.join(", ")}</h1>
          <h1 className='text-xl mt-3'><b>Total price: </b> <b> Rs.{bus.price * selectedSeats.length}/-</b> </h1>
        </div>
        <hr/>
        <div>
          <button className={`'secondary-btn mt-3' ${selectedSeats.length===0 && "disabled-btn mt-3"}`}onClick={BookNow}
          disabled={selectedSeats.length===0}
          >Book Now</button>
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