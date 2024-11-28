import React from "react";

import { Routes, Route } from "react-router-dom";
import { DynamicItem, Sidebar, dummyData } from "./components";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <div id="main">
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          {dummyData &&
            dummyData.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<DynamicItem page={item.name} />}
              />
            ))}
        </Routes>
      </Sidebar>
    </div>
  );
}

export default App;
