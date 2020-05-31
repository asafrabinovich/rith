import React, {Component} from "react";
import ApartmentWidget from "../Apartment/ApartmentWidget";
import {GridList} from "@material-ui/core";
import {GridListTile} from "@material-ui/core";
import ReviewWidget from "./ReviewWidget";


export default class ReviewsTable extends Component{

    render() {
        const {reviews,onClick} = this.props;

        return(
            <div className='m-5'>
                <GridList cols={3}>
                    {reviews.map(review => {
                        return (
                            <GridListTile className='h-auto ' key={review._id}>
                                <ReviewWidget review={review} onClick={onClick}/>
                            </GridListTile>
                        );
                    })}
                </GridList>
            </div>
        );
    }
}
