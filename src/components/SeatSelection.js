import React from 'react';
import {Row,Col} from "antd";
import "../resources/bus.css";

// i am going to get the bus information also
function SeatSelection({selectedSeats,setSelectedSeats,bus })
 {
    const capacity=bus.capacity;

    //im going to get seat number
    const selectOrUnselectSeats=(seatNumber)=>{
        //if it is already selected in the included seat im going to remove it..
       if(selectedSeats.includes(seatNumber)){
        setSelectedSeats(selectedSeats.filter((seat)=>seat!==seatNumber))
       }
       else{//im going to add it..
        setSelectedSeats([...selectedSeats,seatNumber]);
       }

        
    }
  return (
    <div>
        <div className="bus-container">
        {/* if bus capacity is 30 im gonna loop 30 times  */}
        {/* one row has 24 column */}
        <Row gutter={[10,10]}>
            {Array.from(Array(capacity).keys()).map((seat)=>
        {
            //background color checking
            
            let seatClass="";
            //empty string means ie available..

            // seats starts with 1 
            if(selectedSeats.includes(seat+1))
            {
                seatClass="selected-seat"
            }
            else if(bus.seatsBooked.includes(seat+1)){
                seatClass="booked-seat"
            }
                
            
            return (
            <Col span={6}> 
            {/* 4 seats per 1 row 6*4=24 */}
            {/* its dynamic whether its selected or booked */}
            {/* in this below selected seat green, normal seat white */}
                <div className={`seat ${seatClass}`} onClick={()=>selectOrUnselectSeats(seat+1)}>
                    {/* seat+1 means seatNumber */}
                    {seat+1}
                </div>    
            </Col>)
        }
           
         )}
        </Row>
    </div>
    </div>
    
  )
}

export default SeatSelection;