import React, {Component} from "react";
import PrivateAreaCard from "./PrivateAreaCard";
import {getApartment, getLatestPayments} from "../../../Services/FakeAptService";
import httpService from "../../../Services/httpService";


export default class PrivateAreaReviewWidget extends Component {
    constructor() {
        super();
        // const user = authService.getCurrentUser();
        // if(user && user.isAdmin) {
        //     this.columns.push(this.deleteColumn)
        // }
    }

    state = {
        title: '',
        details: '',
        mainPhoto: '',
        status: '',
        ratingStatus: ''
    };

    componentDidMount() {
        this.getPageData();
    }

    getPageData = async () => {
        const {review} = this.props;

        const status = review.status;
        const ratingStatus = review.ratingStatus;
        const mainPhoto = review.mainPhoto;
        const title = await this.buildApartmentAddress();
        this.setState({title, status, ratingStatus, mainPhoto});

    }

    buildApartmentAddress = async () => {
        const {apartmentID} = this.props;
        const apartment = await getApartment(apartmentID);
        return apartment.street + ' ' + apartment.streetNumber + ', ' + apartment.city;

    }

    render() {
        const {review, onClick, apartmentID} = this.props;
        const {title, mainPhoto, status, ratingStatus} = this.state;
        return (
            <React.Fragment>
                {/*<Link className="page-link" to={`/apartments/${apartment._id}`} >*/}
                <PrivateAreaCard
                    pic={mainPhoto}
                    width='200px'
                    height='200px'
                    title={title}
                    status={status}
                    ratingStatus={ratingStatus}
                    onClick={onClick}
                    // parametersToClick={review.userID}
                    apartmentID={apartmentID}
                    reviewID={review.id}
                />
            </React.Fragment>

        );
    }
}
