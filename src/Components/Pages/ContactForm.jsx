import React, { Component } from "react";
import { Form, TextArea } from 'semantic-ui-react';
import { Container } from "@material-ui/core";


export default class LoginForm extends Form {
    render() {
        return (
            <Container className='rtl w-25 mt-5'>
                <h1 className='text-center'>צור קשר</h1>

                <Form >
                    <TextArea/>
                </Form >

            </Container>
        );
    }

}