//add the bus and editing the bus
import React from "react";
import { Modal, Col, Form, Row, message } from "antd";
import {useDispatch} from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import {ShowLoading,HideLoading} from "../redux/alertsSlice";
import moment from "moment";

function BusForm({showBusForm, setShowBusForm,type="add",getData,selectedBus,setSelectedBus}) {
    const dispatch=useDispatch();
    const onFinish=(async(values)=>{
        try{
            dispatch(ShowLoading())
            let response=null
            if(type==="add"){

                response= await axiosInstance.post("/api/buses/add-bus",values);
                  // ...values,
                  // journeyDate:moment(values.journeyDate).format("dd-mm-yyyy"),
                }
            else{//if type=edit
              response= await axiosInstance.post("/api/buses/update-bus",{
                ...values,
                _id:selectedBus._id,
              });
            }
              
            if(response.data.success){
                message.success(response.data.message)
            }
            else{
                message.error(response.data.message)
            }
            getData();
            setShowBusForm(false);
            setSelectedBus(null);
               dispatch(HideLoading())
        }
        catch(err){
            message.error(err.message)
            dispatch(HideLoading())
        }
    })
  return (
    <Modal
      width={800}
      title={type==="add" ? "Add Bus" : "Update Bus"}
      open={showBusForm}
      onCancel={() => {
        setSelectedBus(null);
        setShowBusForm(false);
      }
      }
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item label="Bus Name" name="name">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Bus Number" name="number">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="capacity" name="capacity">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="From" name="from">
              {/* <input type="text" /> */}
              <select name="" id="">
  
              <option value="others"></option>
                <option value="Chennai">Chennai</option>
                <option value="Madurai">Madurai</option>
                <option value="Trichy">Trichy</option>
                <option value="Velore">Velore</option>
                <option value="Kovai">Kovai</option>
                <option value="Dindigul">Dindigul</option>
                <option value="Tirunelveli">Tirunelveli</option>
                <option value="Thoothukudi">Thoothukudi</option>
                <option value="kanniyakumari">kanniyakumari</option>
                <option value="Namakkal">Namakkal</option>
                <option value="salem">salem</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="To" name="to">
              {/* <input type="text" /> */}
              <select name="" id="">
    
              <option value="others"></option>
                <option value="Chennai">Chennai</option>
                <option value="Madurai">Madurai</option>
                <option value="Trichy">Trichy</option>
                <option value="Velore">Velore</option>
                <option value="Kovai">Kovai</option>
                <option value="Dindigul">Dindigul</option>
                <option value="Tirunelveli">Tirunelveli</option>
                <option value="Thoothukudi">Thoothukudi</option>
                <option value="kanniyakumari">kanniyakumari</option>
                <option value="Namakkal">Namakkal</option>
                <option value="salem">salem</option>
              </select>
            </Form.Item>
          </Col>
          <Col lg={8} xs={12}>
            <Form.Item label="Journey Date" name="journeyDate">
              <input type="date" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={12}>
            <Form.Item label="Departure" name="departure">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={12}>
            <Form.Item label="Arrival" name="arrival">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Type" name="type">
              {/* <input type="text"/> */}
            <select name="" id="">
         
            {/* <option value="others"></option> */}
            <option value="AC sleeper">AC sleeper</option>
            <option value="Non-AC sleeper">Non-AC sleeper</option>
            <option value="Non-AC semi-sleeper">Non-AC semi-sleeper</option>
            <option value="AC semi-sleeper">AC semi-sleeper</option>
            <option value="AC volvo sleeper">AC Volvo sleeper</option>
            </select>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Price" name="price">
              <input type="text" />
            </Form.Item>
          </Col>
          
        </Row>

        <div className="d-flex justify-content-end">
            <button className="secondary-btn" type="submit">save</button>
        </div>
        
      </Form>
    </Modal>
  );
}

export default BusForm;
