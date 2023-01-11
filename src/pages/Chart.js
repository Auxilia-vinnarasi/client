import { message } from 'antd';
import React, { useEffect,useState} from 'react';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { Bar,Pie} from '@ant-design/plots';
import PageTitle from '../components/PageTitle';

function Chart() {
    const[bookings,setBookings]=useState([]);
    // const[bookingspie,setBookingsPie]=useState([]);
    const dispatch=useDispatch();

    const getCharts=async()=>{
        try{
            dispatch(ShowLoading());
            const response=await axiosInstance.post("/api/bookings/get-bookings-by-user-id",{});
            dispatch(HideLoading());
            if(response.data.success){
                //setBookings(response.data.data);
                const mappedData=response.data.data.map((booking)=>{
                    return {
                        ...booking,
                        ...booking.bus,
                        key:booking._id,
                    }
                })
                setBookings(mappedData);
            }
            else{
                message.error(response.data.message);
            }

        }
        catch(err){
            dispatch(HideLoading());
            message.error(err.message);
        }
    }

    const config = 
    {
       data: bookings,
        xField: "seats",
        // xField:"capacity",
        yField: 'name',
        seriesField: 'name',
        // isStack: true,
        legend: {
          position: 'top-left',
        },
      };

    //   const getChartsPie=async()=>{
    //     try{
    //         dispatch(ShowLoading());
    //         const response=await axiosInstance.post("/api/bookings/get-all-bookings",{});
    //         dispatch(HideLoading());
    //         if(response.data.success){
    //             //setBookings(response.data.data);
    //             const mappedData=response.data.data.map((booking)=>{
    //                 return {
    //                     ...booking,
    //                     ...booking.bus,
    //                     key:booking._id,
    //                 }
    //             })
    //             setBookingsPie(mappedData);
    //         }
    //         else{
    //             message.error(response.data.message);
    //         }

    //     }
    //     catch(err){
    //         dispatch(HideLoading());
    //         message.error(err.message);
    //     }
    // }
   
      const configPie= {
        appendPadding: 10,
        data:bookings,
        angleField: 'seats',
        colorField: 'name',
        radius: 0.75,
        label: {
          type: 'outer',
          // labelHeight: 28,
          content: '{name} {percentage}',
        },
        interactions: [
          {
            type: 'pie-legend-active',
          },
          {
            type: 'element-active',
          },
        ],
      };


    useEffect(()=>{
        getCharts()
    },[])

    // useEffect(()=>{
    //   getChartsPie();
    // },[]);

  return (
    <div>
        <PageTitle title="Bar Chart"/>
        <Bar className="mt-5"{...config}/>
        {/* <PageTitle title="Pie Chart"/> */}
        <Pie className="mb-5" {...configPie}/>
    </div>
  
  )
}

export default Chart