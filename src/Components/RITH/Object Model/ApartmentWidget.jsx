import React, {Component} from "react";
import Card from "./Card";
import {getLatestPayments} from "../../../Services/FakeAptService";
import _ from 'lodash';
import {Link} from "react-router-dom";


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
        address: ''
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
        this.setState({title,details,address});
    }
    render() {
        const {apartment,onClick} = this.props;
        const {title,details,address} = this.state;
        const pic = 'https://cdn.vox-cdn.com/thumbor/EmOyMCRzSUv0ULrHejUaXNa25wk=/0x0:1700x960/925x925/filters:focal(714x344:986x616):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/57514059/mario.0.jpg';
        return(
            <React.Fragment >
                <div
                    onClick={() => onClick(apartment._id)}
                    style={{cursor:'pointer'}}
                >
                    {/*<Link className="page-link" to={`/apartments/${apartment._id}`} >*/}
                    <Card
                        pic = {pic}
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
