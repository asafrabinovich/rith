import React, {Component} from "react";
import Joi from "joi-browser";
import {getApartment, getLatestPayments} from "../../../Services/FakeAptService";
import {Container, GridList, GridListTile} from "@material-ui/core";
import Form from "../../Common/Form";
import ReviewsTable from "./ReviewsTable";


export default class Apartment extends Form{
    constructor({match, history}) {
        super();
    }
    state = {
        data: {
            street: '',
            streetNumber: '',
            city: '',
            apartmentNumber: '',
            floorNumber: '',
            numberOfRooms:'',
            squareFit: '',
            ownerName: '',
            rent: '',
            waterBill: '',
            electricityBill: '',
            taxProperty: '',
        },
        apartmentId:'',
        reviews: []
    }


    async componentDidMount() {
       await this.checkIfApartmentHasMoreThanOneReview();
        // await this.populateApartment();
    };

    checkIfApartmentHasMoreThanOneReview = async () =>{
        const apartmentId = this.props.match.params.apartmentId;
        await this.setState({apartmentId});
        const apartment = await getApartment(apartmentId);

        if (apartment.reviews.length <= 1) {
            this.props.history.push(`/apartments/${apartment._id}/reviews/${apartment.listOfReviews[0]._id}`);
        } else {
            await this.setState({data: this.mapToViewModel(apartment)});
            await this.setState({reviews: apartment.reviews})
            // this.populateReviews(apartment);

        }
    }
    handleReviewChosen = (reviewId) =>{
        const {apartmentId} = this.state;
        this.props.history.push(`/apartments/${apartmentId}/reviews/${reviewId}`);
    }
    mapToViewModel(apartment) {
        const lastPayments= getLatestPayments(apartment);
        return {
            street:apartment.street,
            streetNumber: apartment.streetNumber,
            city: apartment.city,
            apartmentNumber: apartment.apartmentNumber,
            floorNumber: apartment.floorNumber,
            numberOfRooms:apartment.numberOfRooms,
            squareFit: apartment.squareFit,
            ownerName:apartment.ownerDocument,
            rent: lastPayments.latestRent,
            waterBill: lastPayments.latestWaterBill,
            electricityBill:lastPayments.latestElectricityBill ,
            taxProperty: lastPayments.latestPropertyTax,
        }
    }

    render(){
        const {street,streetNumber,city,apartmentNumber,floorNumber,numberOfRooms,squareFit,ownerName,rent,waterBill,electricityBill,taxProperty} = this.state.data;
        const {reviews} = this.state;
        const headline = "רחוב " + street + " " + streetNumber;
        const subHeadline =  city + ", דירה " + apartmentNumber;
        const squareFitText = squareFit + ' מ"ר';
        const lastRent = rent + '₪ לחודש';
        const lastWaterBill = waterBill  + '₪ לחודש';
        const lastElectricityBill = electricityBill  + '₪ לחודש';
        const lastTaxProperty = taxProperty  + '₪ לחודש';

        const numbersOfReviewsText = reviews.length + ' ביקורות';

        return (
            <React.Fragment>
                <Container className='rtl w-75'>
                    <Container className='text-center mt-5 '>
                        <h1 className=''>{headline}</h1>
                        <h5>{subHeadline}</h5>
                    </Container>
                    <Container className='mt-5'>
                        <h2 className='mb-3'>פרטים על הדירה:</h2>
                        <GridList cols={2}>
                            <GridListTile className='w-25 ' >
                                <Container>
                                    {this.renderLabel('קומה', floorNumber)}
                                    {this.renderLabel('מספר חדרים', numberOfRooms)}
                                    {this.renderLabel('גודל הדירה', squareFitText)}
                                    {ownerName && this.renderLabel('שם המשכיר', ownerName)}
                                </Container>
                            </GridListTile>
                            <GridListTile className='h-auto ' >
                                <Container>
                                    {this.renderLabel('שכ"ד אחרון שעודכן', lastRent)}
                                    {this.renderLabel('חשבון מים אחרון שעודכן', lastWaterBill)}
                                    {this.renderLabel('חשבון חשמל אחרון שעודכן', lastElectricityBill)}
                                    {this.renderLabel('ארנונה אחרונה שעודכנה', lastTaxProperty)}
                                </Container>
                            </GridListTile>
                        </GridList>
                    </Container>
                    <Container>
                        <h2 className=''>ביקורות:</h2>
                        <p className='text-justify'>{numbersOfReviewsText}</p>
                        <ReviewsTable
                            reviews = {reviews}
                            onClick ={this.handleReviewChosen}
                        />
                    </Container>
                </Container>


            </React.Fragment>
        )
    };
}
