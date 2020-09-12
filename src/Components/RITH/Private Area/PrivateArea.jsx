import React, {Component} from "react";
import {getUserDetails, getUserReviews, editUserDetails} from "../../../Services/userService"
import Form from "../../Common/Form";
import Input from "../../Common/Input";
import Joi from "joi-browser";
import {Container, GridList, GridListTile} from '@material-ui/core';
import auth from "../../../Services/authService";
import PrivateAreaReviewsTable from "../Object Model/PrivateAreaReviewsTable";

export default class PrivateArea extends Form {
    state = {
        data: {name: "", email: "", oldPassword: '', newPassword: '', newPasswordConfirmation: ''},
        defaultData: {name: "", email: "", oldPassword: '', newPassword: '', newPasswordConfirmation: ''},
        reviews: [],
        errors: {},
        isEditDetailsDisabled: true,
        isEditMode: true,
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
        oldPassword: Joi
            .string()
            .required()
            .label('סיסמא נוכחית')
            .error(() => {
                return {
                    message: 'יש להזין את הסיסמא',
                };
            }),
        newPassword: Joi
            .string()
            .required()
            .label('אימות סיסמא')
            .error(() => {
                return {
                    message: 'יש להזין את הסיסמא החדשה או שהססמאות אינן זהות',
                };
            }),
        newPasswordConfirmation: Joi
            .string()
            .required()
            .label('סיסמא חדשה')
            .error(() => {
                return {
                    message: 'יש להזין את הסיסמא החדשה שוב או שהססמאות אינן זהות',
                };
            }),
    }

    async componentDidMount() {
        const details = await getUserDetails();
        const UserReviewsResult = await getUserReviews();
        const reviews = this.buildReviews(UserReviewsResult);
        const data = {name: details.data.userName, email: details.data.email}
        await this.setState({data: data, reviews: reviews, defaultData: data});
    }

    setPrivateDetailsToDefault = () => {
        let state = {...this.state};
        state.isEditDetailsDisabled = true;
        state.editDetailsText = 'ערוך פרטים';
        state.data.name = state.defaultData.name;
        state.data.email = state.defaultData.email;
        this.setState({
            isEditDetailsDisabled: state.isEditDetailsDisabled,
            editDetailsText: state.editDetailsText,
            data: state.data
        })
    }
    setPasswordsToDefault = () => {
        let state = {...this.state};
        state.data.oldPassword = state.data.newPassword = state.data.newPasswordConfirmation = '';
        this.setState({
            oldPassword: state.data.oldPassword,
            newPassword: state.data.newPassword,
            newPasswordConfirmation: state.data.newPasswordConfirmation
        })
    }
    handleChangePasswordSubmit = async () => {
        const passwordsToSend = {
            'oldPassword': this.state.data.oldPassword,
            'newPassword': this.state.data.newPassword,
            'email': this.state.data.email
        }
        try {
            const res = await auth.changePassword(passwordsToSend);
            console.log("Change Pass res: ", res);
            this.setPasswordsToDefault();
        } catch (e) {
            if (e.response && (e.response.status === 400 || e.response.status === 401)) {
                const errors = {...this.state.errors};
                errors.oldPassword = "הסיסמא הקודמת אינה נכונה";
                this.setState({errors});
            }
        }
    }
    verifyNewPasswordConfirmation = () => {
        return !(this.state.data.newPassword === this.state.data.newPasswordConfirmation && this.state.data.newPassword && this.state.data.oldPassword);
    }
    buildReviews = (result) => {
        let userReviews = [];
        result.data.forEach(object => {
            if (object.reviews.length > 0) {
                userReviews = [...userReviews, {reviewObject: object.reviews[0], apartmentID: object._id}];
            }
        })
        return userReviews
    }
    handleReviewChosen = (reviewID, apartmentID) => {
        let isEditMode = this.state.isEditMode;
        this.props.history.push(`/upload-review/${apartmentID}/${reviewID}`);
    }
    handleEditDetailsClicked = () => {
        let state = {...this.state};
        state.isEditDetailsDisabled = !state.isEditDetailsDisabled;
        if(state.isEditDetailsDisabled && this.verifyDetailsChanged()){ 
            editUserDetails(state.data.name, state.data.email);
        }
        this.setState({isEditDetailsDisabled:state.isEditDetailsDisabled});
    }
    verifyDetailsChanged = () => {
        return (this.state.data.name!== this.state.defaultData.name ||
            this.state.data.email !== this.state.defaultData.email)
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
                                    {this.renderInput('email', 'מייל:', 'text', this.state.isEditDetailsDisabled)}
                                    <button onClick={this.handleEditDetailsClicked}
                                            className='btn btn-primary mr-2'>{this.state.editDetailsText}</button>
                                    <button onClick={this.setPrivateDetailsToDefault}
                                            className='btn btn-secondary'>ביטול
                                    </button>
                                </Container>
                            </GridListTile>
                            <GridListTile className='h-auto '>
                                <Container className=' w-75'>
                                    <h3> שינוי סיסמא:</h3>
                                    {this.renderInput('oldPassword', 'סיסמא ישנה:')}
                                    {this.renderInput('newPassword', 'סיסמא חדשה:')}
                                    {this.renderInput('newPasswordConfirmation', 'סיסמא חדשה:')}
                                    <button onClick={this.handleChangePasswordSubmit}
                                            className='btn btn-primary mr-2'
                                            disabled={this.verifyNewPasswordConfirmation()}>אישור
                                    </button>
                                    <button onClick={this.setPasswordsToDefault}
                                            className='btn btn-secondary'>ביטול
                                    </button>
                                </Container>
                            </GridListTile>
                        </GridList>
                    </Container>
                    <Container className='rtl w-75'>
                        <h3> הביקורות שלי:</h3>
                        <GridList cols={1}>
                            <PrivateAreaReviewsTable reviews={this.state.reviews} onClick={this.handleReviewChosen}/>
                        </GridList>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}