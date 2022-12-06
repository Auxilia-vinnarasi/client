//import {Button} from "antd";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./resources/global.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>*/}
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
