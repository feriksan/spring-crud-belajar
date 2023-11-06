import React, {Component, useState} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col, Card } from 'antd';
import './auth.css'
import axios from "axios";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        };
    }
    loginDone(ada){
        console.log(ada)
        this.props.loginHandler()
    }

    render() {
        return (
            <div>
                <Row justify="center">
                    <Col span={10}>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Button onClick={() => this.loginDone("HAI")}></Button>
                        <AuthHandler loginHandler={this.props.loginHandler}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

function RegisterForm(){
    const onFinish = (values) => {

        console.log('Received values of form: ', values);
    };
    return(
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                <br/>
                Or <a href="">register now!</a>
            </Form.Item>
        </Form>
    )
}

function LoginForm({auth}){
    const onFinish = (values) => {
        {auth}
        // AuthAPI(values)
    };
    return(
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                <br/>
                Or <a href="">register now!</a>
            </Form.Item>
        </Form>
    )
}

function AuthHandler({loginHandler}){
    const runLogin = (data) =>{
        {loginHandler(data)}
    }
    const tabList = [
        {
            key: 'tab1',
            tab: 'Login',
        },
        {
            key: 'tab2',
            tab: 'Register',
        },
    ];
    const contentList = {
        tab1: <LoginForm login={() => runLogin("TEST")}/>,
        tab2: <RegisterForm/>,
    };
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');
    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    };
    return(
        <>
            <Card
                style={{
                    width: '100%',
                }}
                title="Smart DMS"
                tabList={tabList}
                activeTabKey={activeTabKey1}
                onTabChange={onTab1Change}
            >
                {contentList[activeTabKey1]}
            </Card>
        </>
    )
}

async function AuthAPI(data){
    console.log(data)
    const urlLogin = "http://localhost:99/api/auth/login";
    const loginData =
        {
            "username":"feriksan",
            "password":"12345"
        }
    const response = await axios({
        method: 'post',
        url: urlLogin,
        data: loginData,
    })
    console.log(response);
}

export default Login;