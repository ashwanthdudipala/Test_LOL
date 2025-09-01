import React, { useState } from "react";
import "./Sidebar.css"; // add your styles

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <header>
          {isCollapsed ?(
              <><div>
                <button className="collapse-btn" onClick={toggleSidebar}>
                  <img src="./src/assets/menu.svg"/>
                </button>
                <div>
                <img src="./src/assets/health_cross.png" alt="health"/>
                </div>
              </div>
              </>
            )
             :(<>
                  <img src="./src/assets/health_cross.png" alt="health"/>
                  <h2>Project_LOL</h2>
                  <button className="collapse-btn" onClick={toggleSidebar}>
                    <img src="./src/assets/menu.svg"/>
                  </button>
             </>)}
      </header>
      <main>
        <div className="sideBox">
          <button className="sidebar-button" onClick={()=>{if(window.location.pathname != '/dashboard'){window.location.href = '/dashboard'}}}>
                <div className="button-content">
                  <img src="./src/assets/dashboard.png" alt="dashboard" />
                </div>
                <div>
                  {!isCollapsed && <p className="space">Dashboard</p>}
                </div>
            </button>
        </div>
        <div className="sideBox" onClick={()=>{if(window.location.pathname != '/healthconditions'){window.location.href = '/healthconditions'}}}>
          <button className="sidebar-button" >
                <div className="button-content">
                  <img src="./src/assets/ecg.png" alt="ecg" />
                </div>
                <div className="button-content">
                  {!isCollapsed && <p className="space">Conditions</p>}
                </div>
            </button>
        </div>
        <div className="sideBox">
          <button className="sidebar-button" onClick={()=>{if(window.location.pathname != '/medications'){window.location.href = '/medications'}}}>
                <div className="button-content">
                  <img src="./src/assets/medic.png" alt="medic" />
                </div>
                <div className="button-content">
                  {!isCollapsed && <p className="space">Medications</p>}
                </div>
            </button>
        </div>
      </main>
    </div>
  );
}
