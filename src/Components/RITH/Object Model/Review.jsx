import React, {Component} from "react";
import Form from "../../Common/Form";
import {getApartment, getLatestPayments} from "../../../Services/FakeAptService";
import {Container, GridList, GridListTile} from "@material-ui/core";
import Malfunctions from "./Malfunctions";
import httpService from "../../../Services/httpService";

export default class Review extends Form {

    state = {
        data: {}

    }

    async componentDidMount() {
        await this.populateReview();
    };

    populateReview = async () => {
        const apartmentId = this.props.match.params.apartmentId;
        const userID = this.props.match.params.userID;
        const apartment = await getApartment(apartmentId);
        const uploaderName = await httpService.getUploaderName(userID);
        await this.setState({data: this.mapToViewModel(apartment, userID, uploaderName)});
    }

    mapToViewModel = (apartment, userID, uploaderName) => {

        let review = {...apartment.reviews.filter(review => review.userID === userID)};
        review = review[0];
        return {
            street: apartment.street,
            streetNumber: apartment.streetNumber,
            city: apartment.city,
            apartmentNumber: apartment.apartmentNumber,
            floorNumber: apartment.floorNumber,
            numberOfRooms: apartment.numberOfRooms,
            squareFit: apartment.squareFit,
            ownerName: apartment.ownerName,
            rent: review.lastRent,
            waterBill: review.lastWaterBill,
            electricityBill: review.lastElectricityBill,
            taxProperty: review.propertyTax,
            malfunctions: review.listOfMalfunctions,
            uploaderName: uploaderName
        }
    }
    render() {
        const {street, streetNumber, city, apartmentNumber, floorNumber, numberOfRooms, squareFit, ownerName, rent, waterBill, electricityBill, taxProperty, malfunctions, uploaderName} = this.state.data;
        const headline = "רחוב " + street + " " + streetNumber;
        const subHeadline =  city + ", דירה " + apartmentNumber;
        const squareFitText = squareFit + ' מ"ר';
        const lastRent = rent + '₪ לחודש';
        const lastWaterBill = waterBill  + '₪ לחודש';
        const lastElectricityBill = electricityBill  + '₪ לחודש';
        const lastTaxProperty = taxProperty + '₪ לחודש';
        const uploadedBy = 'הועלה על ידי: ' + uploaderName;
        return(
            <React.Fragment>
                <Container className='rtl w-75'>
                    <Container className='text-center mt-5 '>
                        <h1 className=''>{headline}</h1>
                        <h5>{subHeadline}</h5>
                        <h5>{uploadedBy}</h5>

                    </Container>
                    <Container className='mt-5'>
                        <h2 className='mb-3'>פרטים על הדירה:</h2>
                        <GridList cols={2}>
                            <GridListTile className='w-50 '>
                                <Container>
                                    {this.renderLabel('קומה', floorNumber)}
                                    {this.renderLabel('מספר חדרים', numberOfRooms)}
                                    {this.renderLabel('גודל הדירה', squareFitText)}
                                    {ownerName && this.renderLabel('שם המשכיר', ownerName)}
                                </Container>
                            </GridListTile>
                            <GridListTile className='h-auto '>
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
                        {/*<h2 className=''>ביקורות:</h2>*/}
                        <Malfunctions
                            malfunctions={malfunctions}
                            viewOnly={true}
                        />
                    </Container>
                </Container>


            </React.Fragment>
        );
    }
}