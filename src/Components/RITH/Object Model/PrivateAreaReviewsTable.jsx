import React, {Component} from "react";
import ApartmentWidget from "./ApartmentWidget";
import {GridList} from "@material-ui/core";
import {GridListTile} from "@material-ui/core";
import ReviewWidget from "./ReviewWidget";
import PrivateAreaReviewWidget from "./PrivateAreaReviewWidget";


export default class PrivateAreaReviewsTable extends Component {

    render() {
        const {reviews, onClick} = this.props;

        return (
            <div className='m-5'>
                <GridList cols={1}>
                    {reviews.map(review => {
                        return (
                            <GridListTile className='h-auto ' key={review._id}>
                                {/*<ReviewWidget review={review} onClick={onClick}/>*/}
                                <PrivateAreaReviewWidget review={review.reviewObject} apartmentID={review.apartmentID}
                                                         onClick={onClick}/>
                            </GridListTile>
                        );
                    })}
                </GridList>
            </div>
        );
    }
}
