import React, {Component} from "react";
import Joi from 'joi-browser';
import Form from "../Common/Form";
import {register} from "../../Services/userService";
import auth from "../../Services/authService";
import {Container} from "@material-ui/core";

export default class RegisterForm extends Form{
    state = {
        data:{username:'', password: '', name: ''},
        errors: {}
    };
    schema ={
        username: Joi
            .string()
            .required()
            .email()
            .label('Username')
            .error(() => {
                return {
                    message: 'יש להזין כתובת מייל',
                };
            }),
        password: Joi
            .string()
            .required()
            .min(5)
            .label('Password')
            .error(() => {
                return {
                    message: 'יש להזין סיסמא שאורכה גדול מ-5',
                };
            }),
        name: Joi
            .string()
            .required()
            .label('Name')
            .error(() => {
                return {
                    message: 'יש להזין שם',
                };
            })
    };

    doSubmit = async () =>{
        try {
            console.log(this.state.data);
            const response = await register(this.state.data);
            // console.log("Response",response)

            auth.loginWithJwt(response.headers['x-auth-token']);
            window.location = '/';
        }catch (e) {
            if(e.response && e.response.status === 500)
            {
                const errors = {...this.state.errors};
                errors.username = e.response.data;
                this.setState({errors});
            }
        }

    };

    render() {
        return (
            <Container className='w-25 rtl mt-5'>
                <h1 className='text-center'>הרשמה</h1>
                <form onSubmit= {this.handleSubmit} >
                    {this.renderInput('name', 'שם:')}
                    {this.renderInput('username', 'כתובת מייל:', 'email')}
                    {this.renderInput('password', 'סיסמא:', 'password')}
                    <Container className='w-50'>
                        {this.renderButton('אישור')}
                    </Container>
                </form>
            </Container>
        );
    }

}