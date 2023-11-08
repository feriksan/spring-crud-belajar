import React, {Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Metadatamaster from "./Page/MetadataMaster/Metadatamaster.jsx";
import DashboardComponent from "./Page/Dashboard/Dashboard.jsx";

class AppComponent extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <Routes>
          <Route path="/" element={<DashboardComponent />} />
          <Route path="/metadata" element={<Metadatamaster />} />
        </Routes>
    )
  }
}

export default AppComponent;