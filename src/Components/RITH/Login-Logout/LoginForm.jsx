import React, {Component} from "react";
import Joi from 'joi-browser';
import Form from "../../Common/Form";
import auth from "../../../Services/authService";
import {Redirect} from "react-router-dom";
import {Container} from "@material-ui/core";

export default class LoginForm extends Form{
    state = {
        data:{username:'', password: ''},
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
            .label('Password')
            .error(() => {
                return {
                    message: 'יש להזין סיסמא',
                };
            })
    };

    doSubmit = async () =>{
        try {
            const {data} = this.state;
            await auth.login(data.username,data.password);
            const {state} = this.props.location;
            window.location = state ?state.from.pathname : '/';
        }catch (e) {
            if(e.response && (e.response.status === 400 || e.response.status === 401) )
            {

                const errors = {...this.state.errors};
                errors.username = "הסיסמא אינה תואמת את כתובת המייל או שאינך רשום";
                this.setState({errors});
            }
        }
    };
    routeToRegister = ()=>{
        const {state} = this.props.location;
        window.location = '/register';
    }
    isReroutedFromUploadReview = () =>{
        const {state} = this.props.location;
        return state;
    }
    // doSubmit =  () =>{
    //     try {
    //         const {data} = this.state;
    //         auth.fakeLogin(data.username,data.password);
    //         const {state} = this.props.location;
    //         window.location = state ?state.from.pathname : '/';
    //     }catch (e) {
    //         if(e.response && e.response.status === 400)
    //         {
    //             const errors = {...this.state.errors};
    //             errors.username = e.response.data;
    //             this.setState({errors});
    //         }
    //     }
    // };

    render() {
        if(auth.getCurrentUser()) return <Redirect to='/'/>;
        return (
            <Container className='rtl w-25 mt-5'>
                <h1 className='text-center'>התחברות</h1>
                <h6 className='text-center'>הכנס את פרטי המשתמש שלך</h6>
                {this.isReroutedFromUploadReview() && <h6 className='text-center' style={{color:'red'}}>יש להירשם כדי לעלות ביקורת לאתר</h6>}
                <form onSubmit= {this.handleSubmit} className='mt-4' >
                    {this.renderInput('username', 'שם משתמש:')}
                    {this.renderInput('password', 'סיסמא:', 'password')}
                    <p style={{cursor:'pointer'}} className='btn-link ml-1 mt-3' onClick={this.routeToRegister}>אין לכם חשבון? לחצו כדי להירשם</p>

                    <Container className='w-50'>
                        {this.renderButton('אישור')}
                    </Container>

                </form>
            </Container>
        );
    }

}