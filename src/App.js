import React, {Component} from 'react';
import {Route, Switch, Redirect } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import authService from "./Services/authService";
import NavBar from "./Components/RITH/Navbar";
import LoginForm from "./Components/RITH/LoginForm";
import Logout from "./Components/RITH/Logout";
import RegisterForm from "./Components/RITH/RegisterForm";
import AboutUs from "./Components/RITH/AboutUs";
import ContactForm from "./Components/RITH/ContactForm";
import NotFound from "./Components/RITH/NotFound";
import './App.css';
import Home from "./Components/RITH/Home";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import Apartment from "./Components/RITH/Apartment";
import UploadReviewWelcome from "./Components/RITH/Upload/NewReview/UploadReviewWelcome";
import UploadReview from "./Components/RITH/Upload/NewReview/UploadReview";
import ThankYou from "./Components/RITH/Upload/ThankYou";
import Review from "./Components/RITH/Review";
import Footer from "./Components/Common/Footer";


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
                <NavBar />
                <div className='content'>
                    <Switch>
                        <Route path='/home' component={Home}/>
                        <Route path = '/apartments/:apartmentId/reviews/:reviewId' component = {Review}/>
                        <Route path = '/apartments/:apartmentId' component = {Apartment}/>
                        <Route path='/upload-review/:apartmentId' component={UploadReview}/>
                        <Route path='/upload-review' component={UploadReviewWelcome}/>
                        <Route path='/thank-you' component={ThankYou}/>
                        <Route path='/login' component={LoginForm}/>
                        <Route path='/logout' component={Logout}/>
                        <Route path='/register' component={RegisterForm}/>
                        <Route path='/about' component={AboutUs}/>
                        <Route path='/contact' component={ContactForm}/>
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
