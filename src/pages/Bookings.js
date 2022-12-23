
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BusForm from '../components/BusForm';
import PageTitle from '../components/PageTitle';
import { ShowLoading,HideLoading } from '../redux/alertsSlice';
import { axiosInstance } from "../helpers/axiosInstance";
import {message, Table,Modal} from "antd";
import moment from "moment";

//list the bookings here..
function Bookings() {
    const[showPrintModel,setShowPrintModel]=useState(false);
    const[selectedBooking,setSelectedBooking]=useState(null);
    const[bookings,setBookings]=useState([]);
    const dispatch=useDispatch();

const getBookings=async ()=>{
    try{
        dispatch(ShowLoading());
        const response=await axiosInstance.post("/api/bookings/get-bookings-by-user-id",{});
       // ive given ref in models based on that i have to pull it from buses collection users collection
        dispatch(HideLoading());
        if(response.data.success){
            const mappedData=response.data.data.map((booking)=>{
                //we needs to map the bus details alone
                return{
                        ...booking,
                        ...booking.bus,
                    //    ...booking.user,
                        key:booking._id
              }    
            })
            // setBookings(response.data.data)
            setBookings(mappedData);
        }
        else{
            message.error(response.data.message)
        }
    }
    catch(err){
        dispatch(HideLoading());
        message.error(err.message)
    }
}

const columns=[
    {
        title:"Bus Name",
        dataIndex:"name",
        key:"bus",      
},
{
        title:"Bus Number",
        dataIndex:"number",
        key:"bus",
},
{
        title:"Journey Date",
        dataIndex:"journeyDate",
},
{
    title:"Journey Time",
    dataIndex:"departure",
},
{
    title:"Seats",
    dataIndex:"seats",
    render:(seats,record)=>{
        return(
            <div> {seats.join(",")}</div>
        )
    }
},
{
    title:"Action",
    dataIndex:"action",
    render:(action,record)=>{
        return(
            <div className="text-md underline" onClick={()=>{
                setSelectedBooking(record);
                setShowPrintModel(true);
            }}>
                Print Ticket
            </div>
        )
    }
}

]
    useEffect(()=>{
        getBookings();
      },[])

  return (
    <div>
        <PageTitle title="Bookings"></PageTitle>
        <div>
        <Table dataSource={bookings} columns={columns}></Table>
        </div>
        
      
        {showPrintModel && (
              <Modal title="Print Ticket" onCancel={()=>{
                setShowPrintModel(false);
                setSelectedBooking(null);
            }}
            open={showPrintModel}
            >
             <div className='d-flex flex-column'>
                <hr/>
                <p>Bus Name: {selectedBooking.name}</p>
                <p>From: {selectedBooking.from} - To: {selectedBooking.to}</p>
                <hr/>
                <p><span>Journey date: {moment(selectedBooking.journeyDate).format("DD-MM-YYYY")}</span></p>
                <p><span>Departure: {selectedBooking.departure}</span></p>
                <p><span>Arrival: {selectedBooking.arrival}</span></p>
                <hr/>
                <p><span>Seat Numbers: {selectedBooking.seats.join(", ")}</span></p>
                <p><scan>Total Amount: {selectedBooking.price * selectedBooking.seats.length}</scan></p>
             </div> 
              
             
            </Modal> 
        )}
    </div>
  )
}

export default Bookings