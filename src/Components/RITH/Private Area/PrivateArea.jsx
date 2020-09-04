import React, {Component} from "react";
import {getUserDetails, getUserReviews} from "../../../Services/userService"

export default class PrivateArea extends Component {
    state ={
        firstName : "",
        lastName:"",
        email:"",
        reviews: []
    }
    async componentDidMount() {
        const details = await getUserDetails();
        const reviews = await getUserReviews();
        console.log(reviews)
        await this.setState({firstName:details.data.firstName,
             lastName:details.data.lastName,email:details.data.email,reviews:reviews.data});
    }
    render(){
        return(
            <React.Fragment>
                <div className='text-center rtl'>
                  <h1> האזור האישי </h1>
                  <h3> פרטים אישיים</h3>
                  <p> שם: {this.state.firstName} </p>
                  <p> אימייל: {this.state.email} </p>
                  <button> שינוי סיסמא</button> <button>ערוך פרטים</button>
                </div>
            </React.Fragment>
            )
    }
}