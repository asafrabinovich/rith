import React, { Component } from "react";
import Joi from 'joi-browser';
import Form from "../Utils/Form";
import auth from "../../Services/authService";
import { Container } from "@material-ui/core";

export default class LoginForm extends Form {
    state = {
        data: { name: '', email: '',subject: '',text:'' },
        errors: {}
    };
    schema = {
        name: Joi
            .string()
            .required()
            .label('name')
            .error(() => {
                return {
                    message: 'יש להזין שם פרטי',
                };
            }),
        email: Joi
            .string()
            .required()
            .email()
            .label('Mail')
            .error(() => {
                return {
                    message: 'יש להזין כתובת מייל',
                };
            }),
        subject: Joi
            .string()
            .required()
            .label('Subject')
            .error(() => {
                return {
                    message: 'יש להזין נושא',
                };
            }),
        text: Joi
            .string()
            .required()
            .label('Subject')
            .error(() => {
                return {
                    message: 'יש להזין נושא',
                };
            }),
    };

    doSubmit = () => {
        alert("Sent");
        // try {
        //     const { data } = this.state;
        //     auth.fakeLogin(data.username, data.password);
        //     const { state } = this.props.location;
        //     window.location = state ? state.from.pathname : '/';
        // } catch (e) {
        //     if (e.response && e.response.status === 400) {
        //         const errors = { ...this.state.errors };
        //         errors.username = e.response.data;
        //         this.setState({ errors });
        //     }
        // }
    };

    render() {
        // if(auth.getCurrentUser()) return <Redirect to='/'/>;
        return (
            <Container className='rtl w-25 mt-5' style={{marginBottom:'50px'}}>
                <h1 className='text-center'>צור קשר</h1>

                <form onSubmit={this.handleSubmit} className='mt-4' >
                    {this.renderInput('name', 'שם פרטי:')}
                    {this.renderInput('email', 'כתובת אימייל:', 'email')}
                    {this.renderInput('subject', 'נושא:')}
                    {this.renderTextAreaInput('text',3 , null , 'תוכן ההודעה:' )}

                    <Container className='w-50'>
                        {this.renderButton('אישור')}
                    </Container>

                </form>
            </Container>
        );
    }

}

