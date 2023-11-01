import React, {Component, useState} from "react";
import axios from "axios";
import {Row} from "antd";
import CardItem from "./CardItem.jsx";
class ComponentList extends Component{
    state = {
        fileArray: null,
        error: false,
        loading: false,
    };
    async getFile(){
        var url = "http://localhost:99/api/v1/filedata/get_file_by_user"

        var token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZXJpa3NhbiIsImlhdCI6MTY5ODgxMTE5OCwiZXhwIjoxNjk4ODEyNjM4fQ.KDorjEbzqnKT4ahb7AHbRUYQj450lzNHyWqwsmeNBOg"

        await axios({
            method: 'get',
            url: url,
            headers: {
                "Authorization": "Bearer "+token,
            },
        })
            .then(function (response) {
                this.setState({fileArray: response.data})
                console.log(response);
            })
            .catch(function (response) {
                const error = new Error("Some error");
                console.log(response);
            });
    }
    componentDidMount() {
        this.getFile();
    }

    render() {
        const [fileArray, setFileArray] = useState()
        var itemsCollaps = [];

        fileArray.forEach(element => {
            var cardItem = [
                <Row gutter={16}>
                    {
                        element.fileHistories[0].map(cardData => {
                            return <CardItem triggerDrawer={drawerOpen} data={cardData}/>
                        })
                    }
                </Row>
            ]
            var itemObject = {
                key: count,
                label: element.month,
                children: cardItem,
            }
            itemsCollaps.push(itemObject)
            count++
        });
    }
}