import React, {Component} from "react";
import Card from "./Card";
import {getLatestPayments} from "../../../Services/FakeAptService";
import httpService from "../../../Services/httpService";


export default class ReviewWidget extends Component{
    constructor() {
        super();
        // const user = authService.getCurrentUser();
        // if(user && user.isAdmin) {
        //     this.columns.push(this.deleteColumn)
        // }
    }
    state = {
        title:'',
        details:'',
        mainPhoto: ''
    };
    componentDidMount() {
        this.getPageData();
    }
    getPageData = async () => {
        const {review} = this.props;
        const title = await httpService.getUploaderName(review.userID);
        let livingExperience = review.listOfMalfunctions.filter(m => m.key === 'livingExperience');
        const details = livingExperience[0].text.slice(0, 80) + "...";
        const mainPhoto = review.mainPhoto;
        this.setState({title, details, mainPhoto});
    }
    render() {
        const {review, onClick} = this.props;
        const {title, details, mainPhoto} = this.state;
        return(
            <React.Fragment >
                <div
                    onClick={() => onClick(review.userID)}
                    style={{cursor: 'pointer'}}
                >
                    {/*<Link className="page-link" to={`/apartments/${apartment._id}`} >*/}
                    <Card
                        pic={mainPhoto}
                        width='200px'
                        height ='200px'
                        title ={title}
                        details= {details}
                        onClick={onClick}
                        parametersToClick={review.userID}
                    />
                </div>
                {/*</Link>*/}
            </React.Fragment>

        );
    }
}
