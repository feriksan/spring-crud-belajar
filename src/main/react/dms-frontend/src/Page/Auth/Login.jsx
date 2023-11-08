import React, {Component, useState} from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, Checkbox, Col, Form, Input, Row, Radio } from 'antd';
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
                        {/*<Button onClick={() => this.loginDone("HAI")}></Button>*/}
                        <AuthHandler loginHandler={this.props.loginHandler}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

function RegisterForm({register}){
    const onFinish = (values) => {
        AuthAPI(values, register, "register")
    };
    const onChange = (e) => {
        console.log(`radio checked:${e.target.value}`);
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
            <Form.Item
                name="role"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}
            >
                <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="ROLE_ADMIN">Admin</Radio.Button>
                    <Radio.Button value="ROLE_USER">User</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    )
}

function LoginForm({login}){
    const onFinish = (values) => {
        AuthAPI(values, login, "login")
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
        tab1: <LoginForm login={loginHandler}/>,
        tab2: <RegisterForm register={loginHandler}/>,
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

async function AuthAPI(data, loginHandler, type){
    console.log(data)
    // loginHandler("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5OTQxMzE0NSwiZXhwIjoxNzAwODUzMTQ1fQ.OxFuzh9ZZ_uprpCRKqZ7-9Ypw9rQcLTNcWa0RokGtJw")
    const urlLogin = "http://localhost:99/api/auth/"+type;
    const response = await axios({
        method: 'post',
        url: urlLogin,
        data: data,
    }).then(response => {
        loginHandler(response.data.token)
    })
}

export default Login;