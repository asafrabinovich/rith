import React, {Component} from "react";
import {getUserDetails, getUserReviews} from "../../../Services/userService"
import Form from "../../Common/Form";
import Joi from "joi-browser";
import {Container, GridList, GridListTile} from '@material-ui/core';

export default class PrivateArea extends Form {
    state = {
        data: {name: "", email: ""},
        reviews: [],
        errors: {},
        isEditDetailsDisabled: true,
        editDetailsText: "ערוך פרטים"
    }

    schema = {
        name: Joi
            .string()
            .required()
            .label('שם')
            .error(() => {
                return {
                    message: 'יש להזין שם רחוב',
                };
            }),
        email: Joi
            .string()
            .required()
            .label('כתובת אימייל')
            .error(() => {
                return {
                    message: 'יש להזין שם רחוב',
                };
            }),
    }

    async componentDidMount() {
        const details = await getUserDetails();
        const reviews = await getUserReviews();
        console.log(reviews)
        const data = {name: details.data.firstName, email: details.data.email}
        await this.setState({data: data, reviews: reviews.data});
    }

    handleEditDetailsClicked = async () => {
        let state = {...this.state};
        state.isEditDetailsDisabled = !state.isEditDetailsDisabled;
        state.editDetailsText = state.editDetailsText === 'שמור' ? "ערוך פרטים" : 'שמור';
        this.setState({isEditDetailsDisabled: state.isEditDetailsDisabled, editDetailsText: state.editDetailsText});

    }

    render() {
        return (
            <React.Fragment>
                <div className='text-center rtl'>
                    <h1> אזור אישי </h1>
                    <Container className=' rtl w-75'>
                        <GridList cols={2}>
                            <GridListTile className='h-auto '>
                                <Container className=' w-75'>
                                    <h3> פרטים אישיים:</h3>
                                    {this.renderInput('name', 'שם:', 'text', this.state.isEditDetailsDisabled)}
                                    {this.renderInput('email', 'כתובת אימייל', 'text', this.state.isEditDetailsDisabled)}
                                    <button onClick={this.handleEditDetailsClicked}
                                            className='btn btn-primary'>{this.state.editDetailsText}</button>
                                    <button className='btn btn-secondary'>שינוי סיסמא</button>
                                </Container>
                            </GridListTile>
                        </GridList>
                    </Container>
                </div>
            </React.Fragment>
            )
    }
}