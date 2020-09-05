import React, {Component} from "react";
import {getUserDetails, getUserReviews, editUserDetails} from "../../../Services/userService"
import Form from "../../Common/Form";
import Input from "../../Common/Input";
import Joi from "joi-browser";
import {Container, GridList, GridListTile} from '@material-ui/core';

export default class PrivateArea extends Form {
    state = {
        data: {name: "", email: "", firstPassword: '', secondPassword: '', newPassword: ''},
        reviews: [],
        errors: {},
        isEditDetailsDisabled: true,
        isEditDetailsActive: true,
        isPasswordChangeActive: false,

        editDetailsText: "ערוך פרטים"
    }

    schema = {
        name: Joi
            .string()
            .required()
            .label('שם')
            .error(() => {
                return {
                    message: 'יש להזין את שמך',
                };
            }),
        email: Joi
            .string()
            .required()
            .label('כתובת אימייל')
            .error(() => {
                return {
                    message: 'יש להזין כתובת אימייל',
                };
            }),
        firstPassword: Joi
            .string()
            .required()
            .label('סיסמא נוכחית')
            .error(() => {
                return {
                    message: 'יש להזין את הסיסמא',
                };
            }),
        secondPassword: Joi
            .string()
            .required()
            .label('אימות סיסמא')
            .error(() => {
                return {
                    message: 'יש להזין את הסיסמא',
                };
            }),
        newPassword: Joi
            .string()
            .required()
            .label('סיסמא חדשה')
            .error(() => {
                return {
                    message: 'יש להזין את הסיסמא החדשה',
                };
            }),
    }

    async componentDidMount() {
        const details = await getUserDetails();
        const reviews = await getUserReviews();
        const data = {name: details.data.userName, email: details.data.email}
        await this.setState({data: data, reviews: reviews.data});
    }

    handleEditDetailsClicked = async () => {
        let state = {...this.state};
        state.isEditDetailsDisabled = !state.isEditDetailsDisabled;
        if (state.editDetailsText === 'שמור') {
            state.editDetailsText = 'ערוך פרטים'
            const affirmation = await editUserDetails(state.data.name, state.data.email);
        } else {
            state.editDetailsText = 'שמור'
        }
        this.setState({isEditDetailsDisabled: state.isEditDetailsDisabled, editDetailsText: state.editDetailsText});
    }

    changePasswordClickedHandler = () => {
        let state = {...this.state};
        state.isPasswordChangeActive = !state.isPasswordChangeActive;
        state.isEditDetailsActive = !state.isPasswordChangeActive;
        this.setState({
            isPasswordChangeActive: state.isPasswordChangeActive,
            isEditDetailsActive: state.isEditDetailsActive
        })
    }

    handleNameChanged = (event) => {
        let data = {...this.state.data};
        data.name = event.target.value;
        this.setState({data: data});
    }
    handleEmailChanged = (event) => {
        let data = {...this.state.data};
        data.email = event.target.value;
        this.setState({data: data});
    }
    handleFirstPasswordChanged = (event) => {
        let data = {...this.state.data};
        data.firstPassword = event.target.value;
        this.setState({data: data});
    }
    setToDefault = () => {
        this.componentDidMount()
    }

    render() {
        const {isEditDetailsActive, isPasswordChangeActive} = this.state

        return (
            <React.Fragment>
                <div className='text-center rtl'>
                    <h1> אזור אישי </h1>
                    <Container className=' rtl w-75'>
                        <GridList cols={2}>
                            <GridListTile className='h-auto '>
                                {
                                    isEditDetailsActive &&
                                    <Container className=' w-75'>
                                        <h3> פרטים אישיים:</h3>
                                        <Input name="name" label="שם:" value={this.state.data.name}
                                               disabled={this.state.isEditDetailsDisabled}
                                               onChange={this.handleNameChanged}/>
                                        <Input name="email" label="מייל:" value={this.state.data.email}
                                               disabled={this.state.isEditDetailsDisabled}
                                               onChange={this.handleEmailChanged}/>
                                        <button onClick={this.handleEditDetailsClicked}
                                                className='btn btn-primary mr-2'>{this.state.editDetailsText}</button>
                                        <button onClick={this.changePasswordClickedHandler}
                                                className='btn btn-secondary'>שינוי סיסמא
                                        </button>
                                    </Container>
                                }


                                ////
                                {isPasswordChangeActive &&
                                <Container className=' w-75'>
                                    <h3> שינוי סיסמא:</h3>
                                    <Input name="firstPassword" label="סיסמא ישנה:"/>
                                    <Input name="secondPassword" label="סיסמא חדשה:"/>
                                    <Input name="newPassword" label="סיסמא חדשה:"/>
                                    <button onClick={this.handleEditDetailsClicked}
                                            className='btn btn-primary'>אישור
                                    </button>
                                    <button onClick={this.changePasswordClickedHandler}
                                            className='btn btn-secondary'>חזרה
                                    </button>
                                </Container>
                                }
                            </GridListTile>
                        </GridList>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}