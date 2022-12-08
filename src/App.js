//import {Button} from "antd";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./resources/global.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import AdminHome from "./pages/Admin/AdminHome";
import AdminBuses from "./pages/Admin/AdminBuses";
import AdminUsers from "./pages/Admin/AdminUsers";

function App() {
  //i want to get the loader from the reducer.whenever api req is coming i need spinner
  const {loading}=useSelector(state=>state.alerts);
  return (
    <div>
      {loading &&   <Loader/>}
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        {/* <Route path="/" element={<PublicRoute><Home/></PublicRoute>}/> */}
        <Route path="/admin" element={<ProtectedRoute><AdminHome/></ProtectedRoute>}/>
        <Route path="/admin/buses" element={<ProtectedRoute><AdminBuses/></ProtectedRoute>}/>
        <Route path="/admin/users" element={<ProtectedRoute><AdminUsers/></ProtectedRoute>}/>
        <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
       
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
