import React, {Component} from "react";
import {getApartments, getFullAddress} from "../../../../Services/FakeAptService";
import SearchBox from "../../../Common/SearchBox";
import ApartmentsTable from "../../ApartmentsTable";
import { Container } from '@material-ui/core';
import SearchBoxWithButton from "../../../Common/SearchBoxWithButton";
export default class UploadReviewWelcome extends Component {
    state ={
        apartments : [],
        searchQuery:''
    }
    componentDidMount() {
        // const {data:apartments} = await getApartments();
        const apartments = getApartments();
        this.setState({apartments});
    }

    getPageData = () =>{
        const {apartments : allApartments, searchQuery} = this.state;
        let filtered = allApartments;
        if(searchQuery){
            filtered = allApartments.filter(apartment => apartment.street.toLowerCase().startsWith(searchQuery.toLowerCase()));
            if(filtered.length < 1){
                filtered = allApartments.filter(apartment => apartment.city.toLowerCase().includes(searchQuery.toLowerCase()));
            }
        }

        return {totalCount: filtered.length, data: filtered};
    };
    handleSearchChange = (query)=>{
        this.setState({searchQuery:query });
    };
    handleApartmentClick = (id) =>{
        this.props.history.push(`/upload-Review/${id}`);
    };
    handleSearchSubmit = () =>{
        if(this.state.searchQuery){
            this.props.history.push(`/upload-Review/new`);
        }
    };

    render() {
        const { searchQuery} = this.state;
        const {totalCount, data: apartments} = this.getPageData();
        // const {user} = this.props;
        return(
            <React.Fragment>
                <Container className='mt-3' maxWidth='sm'>
                    <h1 className='text-center rtl'>חפשו דירה</h1>
                    <p className='text-center rtl'>אנחנו בשם האתר מקפידים על הביקורות שעולות כאן באתר ולכן אנחנו מבקשים ממך לעלות ביקורת עניינית, מנומסת ומפורטת ככל האפשר. כדי לעלות ביקורת נדרוש מסמך המהווה הוכחה שאכן שכרת את הדירה והביקורת תצטרך לעבור אישור מהמערכת לפני שהיא תעלה באתר.
                    </p>
                    <div className='rtl'>
                        <SearchBoxWithButton
                            onChange={this.handleSearchChange}
                            onclick={this.handleSearchSubmit}
                            value= {searchQuery}
                            addToClassName = "w-100"
                            placeholder ='חפשו כתובת או עיר'
                            buttonText='בחר כתובת'
                        />
                        {searchQuery && !totalCount && <h2 className='h2 small rtl'>לא נמצאו תוצאות</h2>}
                    </div>
                </Container>

                <ApartmentsTable
                    apartments={apartments}
                    onClick = {this.handleApartmentClick}
                />
            </React.Fragment>

        );
    }
}
