import React, {Component} from 'react';
import {Route, Switch, Redirect } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import authService from "./Services/authService";
import NavBar from "./Components/Layout/Navbar";
import LoginForm from "./Components/Pages/LoginForm";
import Logout from "./Components/Pages/Logout";
import RegisterForm from "./Components/Pages/RegisterForm";
import AboutUs from "./Components/Pages/AboutUs";
import ContactForm from "./Components/Pages/ContactForm";
import NotFound from "./Components/Pages/NotFound";
import './App.css';
import Home from "./Components/Pages/Home";
import ProtectedRoute from "./Components/Utils/ProtectedRoute";
import Apartment from "./Components/Apartment/Apartment";
import UploadReviewWelcome from "./Components/Review/NewReview/UploadReviewWelcome";
import UploadReview from "./Components/Review/NewReview/UploadReview";
import ThankYou from "./Components/Review/NewReview/ThankYou";
import Review from "./Components/Review/Review";
import Footer from "./Components/Utils/Footer";


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
