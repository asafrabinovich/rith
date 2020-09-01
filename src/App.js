import React, {Component} from 'react';
import {Route, Switch, Redirect } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import authService from "./Services/authService";
import NavBar from "./Components/RITH/Object Model/Navbar";
import LoginForm from "./Components/RITH/Login-Logout/LoginForm";
import Logout from "./Components/RITH/Login-Logout/Logout";
import RegisterForm from "./Components/RITH/Register/RegisterForm";
import AboutUs from "./Components/RITH/About Us/AboutUs";
import ContactForm from "./Components/RITH/Contact/ContactForm";
import NotFound from "./Components/RITH/Object Model/NotFound";
import './App.css';
import Home from "./Components/RITH/Home/Home";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import Apartment from "./Components/RITH/Object Model/Apartment";
import UploadReviewWelcome from "./Components/RITH/Upload/UploadReviewWelcome";
import UploadReview from "./Components/RITH/Upload/UploadReview";
import ThankYou from "./Components/RITH/Upload/ThankYou";
import Review from "./Components/RITH/Object Model/Review";
import Footer from "./Components/Common/Footer";
import ContactFormThankYou from "./Components/RITH/Contact/ContactFormThankYou";


export default class App extends Component{
    state ={}

    componentDidMount() {
        const user = authService.getCurrentUser()
        this.setState({user});
    }

    render() {
        const {user} = this.state;
        return (
            <React.Fragment>
                <ToastContainer/>
                <NavBar user = {user} />
                <div className='content'>
                    <Switch>
                        <Route path='/home' component={Home}/>
                        <Route path = '/apartments/:apartmentId/reviews/:reviewId' component = {Review}/>
                        <Route path = '/apartments/:apartmentId' component = {Apartment}/>
                        <Route path='/upload-review/:apartmentId' component={UploadReview}/>
                        <ProtectedRoute path='/upload-review' component={UploadReviewWelcome}/>
                        <Route path='/thank-you' component={ThankYou}/>
                        <Route path='/login' component={LoginForm}/>
                        <Route path='/logout' component={Logout}/>
                        <Route path='/register' component={RegisterForm}/>
                        <Route path='/about' component={AboutUs}/>
                        <Route path='/contact' component={ContactForm}/>
                        <Route path='/contactformthankyou' component={ContactFormThankYou}/>
                        <Route path='/not-found' component={NotFound}/>
                        <Redirect from='/' exact to='/home'/>
                        <Redirect  to='/not-found'/>
                    </Switch>
                </div>
                {/*<Footer/>*/}
            </React.Fragment>
        );
    }
}
