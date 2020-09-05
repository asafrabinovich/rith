import React, {Component} from "react";
import PrivateAreaCard from "./PrivateAreaCard";
import {getLatestPayments} from "../../../Services/FakeAptService";
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

    getPageData = () => {
        const {review} = this.props;
        const title = "יונה הנביא 13, תל אביב - יפו";
        const status = review.status;
        const ratingStatus = review.ratingStatus;
        const mainPhoto = httpService.getImage(review.mainPhoto);
        this.setState({title, status, ratingStatus, mainPhoto});
    }

    render() {
        const {review, onClick} = this.props;
        const {title, details, mainPhoto, status, ratingStatus} = this.state;
        return (
            <React.Fragment>
                <div
                    onClick={() => onClick(review.userID)}
                    style={{cursor: 'pointer'}}
                >
                    {/*<Link className="page-link" to={`/apartments/${apartment._id}`} >*/}
                    <PrivateAreaCard
                        pic={mainPhoto}
                        width='200px'
                        height='200px'
                        title={title}
                        status={status}
                        ratingStatus={ratingStatus}
                        onClick={onClick}
                        parametersToClick={review.userID}
                    />
                </div>
                {/*</Link>*/}
            </React.Fragment>

        );
    }
}
