import React, {Component} from "react";
import Card from "./Card";
import {getLatestPayments} from "../../../Services/FakeAptService";
import httpService from "../../../Services/httpService";
export default class ApartmentWidget extends Component{
    constructor() {
        super();
        // const user = authService.getCurrentUser();
        // if(user && user.isAdmin) {
        //     this.columns.push(this.deleteColumn)
        // }
    }
    state = {
        title:'שכ"ד אחרון שעודכן: ',
        details:'',
        address: '',
        mainPhoto:''
    };
    componentDidMount() {
        this.getPageData();
    }
    getPageData = ()=>{
        const {apartment} = this.props;
        const {latestRent} = getLatestPayments(apartment);
        const title = this.state.title + latestRent + ' ש"ח';
        const details = apartment.numberOfRooms + ' חדרים' + ' • ' + apartment.squareFit + ' מ"ר' + ' • ' + " דירה " + apartment.apartmentNumber;
        const address = "רחוב " + apartment.street + " " + apartment.streetNumber + ", " + apartment.city;
        const mainPhoto = httpService.getImage(apartment.mainPhoto);
        this.setState({title,details,address,mainPhoto});
    }
    render() {
        const {apartment,onClick} = this.props;
        const {title,details,address,mainPhoto} = this.state;
        return(
            <React.Fragment >
                <div
                    onClick={() => onClick(apartment._id)}
                    style={{cursor:'pointer'}}
                >
                    {/*<Link className="page-link" to={`/apartments/${apartment._id}`} >*/}
                    <Card
                        pic = {mainPhoto}
                        width ='200px'
                        height ='200px'
                        title ={title}
                        details= {details}
                        address={address}
                    />
                </div>
                {/*</Link>*/}
            </React.Fragment>

        );
    }
}
