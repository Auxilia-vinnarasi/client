import { message,Row,Col} from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import Bus from '../components/Bus';

function Home() {
  const dispatch=useDispatch();
const {user}=useSelector(state=>state.users);
const [buses,setBuses]=useState([]);


const getBuses=async()=>{
  try{
    dispatch(ShowLoading());
    const response=await axiosInstance.post("/api/buses/get-all-buses",{});
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
      <div>
        {/* filter purpose */}
      </div>
      <div>
        {/* displaying all the buses.. */}
        <Row>
          {buses.map((bus)=>(
            <Col lg={12} xs={24} sm={24}>
              {/* bus we have to pass the data */}
              <Bus bus={bus}/>
            </Col>
          ))}
        </Row>
      </div>
   
    </div>
  )
}

export default Home