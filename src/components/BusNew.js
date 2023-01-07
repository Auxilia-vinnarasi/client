import React from 'react'
import { useNavigate } from 'react-router-dom';

const BusNew= ({busnew}) => {
  const navigate=useNavigate();
  return (
  <div className='card p-2'>
     <h1 className='text-lg'> {busnew.name}</h1>  
     <hr />
    <div className='d-flex justify-content-between'>

      <div>
      <p className="text-sm">From</p>
      <p className="text-sm">{busnew.from}</p>
      </div>

      <div>
      <p className="text-sm">To</p>
      <p className="text-sm">{busnew.to}</p>
      </div>

      <div>
      <p className="text-sm">Price</p>
      <p className="text-sm">Rs.{busnew.price}</p>
      </div>

     </div>

    <div className='d-flex justify-content-between align-items-end'>
    <div>
      <p className='text-sm'>Journey Date </p>
      <p className='text-sm'>{busnew.journeyDate}</p>
    </div>
    <h1 className='text-md underline' onClick={()=>{
      window.alert("Please sign up or login to continue...")
    }}>Book Now</h1>
    </div>
  </div>
  
  )
}

export default BusNew