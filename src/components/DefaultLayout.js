import React, { useState } from "react";
//all the pages i ll be havng the layout in top
// in the page content i need to render the children,
import "../resources/layout.css";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
//if admin is true it is admin menu it is false it is userMenu

//children-means which is pages 
function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed,setCollapsed]=useState(false)
  const {user}=useSelector(state=>state.users);
  const userMenu = [
    {
      name:"Home",
      icon:"ri-home-line",
      path:"/",
  },
  {
    name:"Bookings",
    icon:"ri-file-list-line",
    path:"/bookings",
  },
  // {
  //   name:"Profile",
  //   icon:"ri-file-list-line",
  //   path:"/profile",
  // },
  {
    name:"Logout",
    icon:"ri-logout-box-line",
    path:"/logout"
  }
,];
  const adminMenu = [
    {
      name: "Home",
      path: "/admin",
      icon: "ri-home-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  // const menuToBeRendered = adminMenu;
  const menuToBeRendered=user?.isAdmin ? adminMenu : userMenu;
  let activeRoute = window.location.pathname;
  if(window.location.pathname.includes("book-now"))
  {
    activeRoute="/";
  }

  return (
    <div className="layout-parent">
      <div className="sidebar">
        <div className="sidebar-header">
          <h5 className="logo">Bus Booking</h5>
          <h1 className="role">Hi {user?.name}<br/>Role : {user?.isAdmin ? "Admin" : "User"}</h1>
        </div>
        <div className="d-flex flex-column gap-3 justify-content-start menu">
          {menuToBeRendered.map((item, index) => {
            return (
              <div
                className={`${
                  activeRoute === item.path && "active-menu-item"
                } menu-item`}
              >
                <i className={item.icon}></i>
                {/* <span
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  {item.name}
                </span> */}
                {!collapsed && (<span
                 onClick={() => {
                  if(item.path==="/logout"){
                    localStorage.removeItem("token");
                    navigate("/login");
                  }
                  else{
                    navigate(item.path)
                  }
                }
              }>{item.name}</span>)}
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="header">
          {collapsed ? (<i class="ri-menu-2-fill" onClick={()=>setCollapsed(!collapsed)}>
          </i>) : (<i class="ri-close-line" onClick={()=>setCollapsed(!collapsed)}></i>)}
       
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;

  //  {/* <button className="secondary-btn" 
  //        onClick={()=> navigate("/login")} type="submit">login</button> */}

