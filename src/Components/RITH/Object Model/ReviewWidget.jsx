import React, {Component} from "react";
import Card from "./Card";
import {getLatestPayments} from "../../../Services/FakeAptService";


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
    };
    componentDidMount() {
        this.getPageData();
    }
    getPageData = ()=>{
        const {review} = this.props;
        const title = review.uploaderName;
        const livingExperience = review.listOfMalfunctions.filter(m=>m.type === 'livingExperience');
        const details = livingExperience[0].Text;

        this.setState({title,details});
    }
    render() {
        const {review,onClick} = this.props;
        const {title,details} = this.state;
        const pic = 'https://cdn.vox-cdn.com/thumbor/EmOyMCRzSUv0ULrHejUaXNa25wk=/0x0:1700x960/925x925/filters:focal(714x344:986x616):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/57514059/mario.0.jpg';
        return(
            <React.Fragment >
                <div
                    onClick={() => onClick(review._id)}
                    style={{cursor:'pointer'}}
                >
                    {/*<Link className="page-link" to={`/apartments/${apartment._id}`} >*/}
                    <Card
                        pic = {pic}
                        width ='200px'
                        height ='200px'
                        title ={title}
                        details= {details}
                        onClick = {onClick}
                        parametersToClick = {review._id}
                    />
                </div>
                {/*</Link>*/}
            </React.Fragment>

        );
    }
}
