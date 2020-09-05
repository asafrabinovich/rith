import React, {Component} from "react";
import {getUserDetails, getUserReviews} from "../../../Services/userService"
import Form from "../../Common/Form";
import Joi from "joi-browser";
import {Container, GridList, GridListTile} from '@material-ui/core';
import ReviewsTable from "../Object Model/ReviewsTable";
import PrivateAreaReviewsTableReviewsTable from "../Object Model/PrivateAreaReviewsTable";
import {getApartment} from "../../../Services/FakeAptService";
import _ from "lodash";


export default class PrivateArea extends Form {
    state = {
        data: {name: "", email: ""},
        reviews: [],
        apartment: [],
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
        let reviews = await getUserReviews();
        // ///Temporary
        const apartment = await getApartment("5f4bac85adffeb21c307ee19");
        // ///
        const build = await this.buildReviews(reviews)
        console.log("Build", build)
        const data = {name: details.data.firstName, email: details.data.email}
        // await this.setState({data: data, reviews: reviews.data});
        await this.setState({data: data, reviews: apartment.reviews, apartment: apartment});
        // console.log("Reviews: " ,reviews);


    }

    buildReviews = (reviewsWithApartmentID) => {
        let reviews = [];
        console.log("reviewsWithApartmentID: ", reviewsWithApartmentID);

        reviewsWithApartmentID.forEach(async review => {

            const reviewApartment = await getApartment(review._id);
            console.log("reviewApartment: ", reviewApartment);
            console.log("review reviews: ", review.reviews[0]);

            reviews = review.reviews[0] ? [{
                apartment: reviewApartment,
                reviews: review.reviews[0]
            }, ...reviews] : reviews
        })
        console.log("Reviews: ", reviews);

        return reviews
    }
    handleEditDetailsClicked = async () => {
        let state = {...this.state};
        state.isEditDetailsDisabled = !state.isEditDetailsDisabled;
        state.editDetailsText = state.editDetailsText === 'שמור' ? "ערוך פרטים" : 'שמור';
        this.setState({isEditDetailsDisabled: state.isEditDetailsDisabled, editDetailsText: state.editDetailsText});

    }

    render() {
        const {reviews, apartment} = this.state;
        console.log("apt:", apartment)

        return (
            <React.Fragment>
                <div className='text-center rtl'>
                    <h1> אזור אישי </h1>
                    <Container className='mb-3 rtl w-75'>
                        <h3> פרטים אישיים:</h3>
                        <GridList cols={2}>
                            <GridListTile className='h-auto '>
                                <Container className=' '>
                                    {this.renderInput('name', 'שם:', 'text', this.state.isEditDetailsDisabled)}
                                    {this.renderInput('email', 'כתובת אימייל', 'text', this.state.isEditDetailsDisabled)}
                                    <button onClick={this.handleEditDetailsClicked}
                                            className='btn btn-primary'>{this.state.editDetailsText}</button>
                                    <button className='btn btn-secondary'>שינוי סיסמא</button>
                                </Container>
                            </GridListTile>
                        </GridList>
                    </Container>
                    <Container className=' rtl w-75'>
                        <h3> הביקורות שלי:</h3>
                        <PrivateAreaReviewsTableReviewsTable
                            reviews={reviews}
                            // onClick ={this.handleReviewChosen}
                        />
                    </Container>
                </div>
            </React.Fragment>
            )
    }
}