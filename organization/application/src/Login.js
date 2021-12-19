import React, { Component } from 'react';
import {Button, Form, Input, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
const FormItem = Form.Item;

class LoginForm extends Component {

	handleSubmit = values => {
		this.props.setUser(values.username);
	}

	render() {

		return (
			<div className={"lItem"}>
				<img className={"loginImage"} src={this.props.img} alt={this.props.title} width="100" height="100"/>
				<div className={"loginForm"}>
					<h2>{this.props.title}</h2>
					<Form onFinish={this.handleSubmit} className={"login-form"}>
						<FormItem
							name={"username"}
							rules= {[{
								required: true,
								message: 'Please input your username!'
							}]}>
							<Input prefix={<UserOutlined/>} placeholder="Username"/>
						</FormItem>
						<FormItem
							name={"password"}
							rules={[{
								required: true,
								message: 'Please enter your password'
							}]}>
							<Input prefix={<LockOutlined/>} type={"password"} placeholder={"Password"}/>
						</FormItem>
						<FormItem name={"remember"} valuePropName={"checked"} initialValue={true}>
							<Checkbox>Remember me</Checkbox>
							<Button className={"login-form-button"} type={"primary"} htmlType={"submit"}>Log in</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		);
	}
}
export default LoginForm;
