import React, { useState } from 'react'
import BusForm from '../../components/BusForm';
import PageTitle from '../../components/PageTitle'

function AdminBuses() {
  const[showBusForm,setShowBusForm]=useState(false);
  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Buses"/>
        <button className='secondary-btn' onClick={()=>setShowBusForm(true)}>Add Bus</button>
      </div>
    {showBusForm && <BusForm showBusForm={showBusForm} setShowBusForm={setShowBusForm}/>}
    </div>
  )
}

export default AdminBuses