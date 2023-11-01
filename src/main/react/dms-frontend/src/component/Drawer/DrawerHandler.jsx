import {Drawer} from "antd";
import DrawerContent from "./DrawerContent.jsx";
import React, {Component} from "react";

class DrawerHandler extends Component{
    render(){
        <Drawer title={this.props.name} placement="right" onClose={this.props.close} open={this.props.open}>
            <DrawerContent drawerData={this.props.data}/>
        </Drawer>
    }
}