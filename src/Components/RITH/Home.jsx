import React, {Component} from "react";
import {getApartments} from "../../Services/FakeAptService";
import SearchBox from "../Common/SearchBox";
import ApartmentsTable from "./ApartmentsTable";

export default class Home extends Component {
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
            filtered = allApartments.filter(apartment => apartment.street.toLowerCase().includes(searchQuery.toLowerCase()));
            if(filtered.length < 1){
                filtered = allApartments.filter(apartment => apartment.city.toLowerCase().includes(searchQuery.toLowerCase()));
            }
        }

        return {totalCount: filtered.length, data: filtered};
    };
    handleSearchChange = (query)=>{
        this.setState({searchQuery:query });
    };
    handleApartmentChosen = (id) =>{
        this.props.history.push(`/apartments/${id}`);
    }

    render() {
        const { searchQuery} = this.state;
        const {totalCount, data: apartments} = this.getPageData();
        // const {user} = this.props;
        return(
            <React.Fragment>
                <div className='row '>
                    <div className='col-11 m-2 col'>
                        <h1 className='rtl'>חפשו דירה</h1>
                    </div>
                </div>
                <div className='col-11  rtl'>
                    <SearchBox
                        onChange={this.handleSearchChange}
                        value= {searchQuery}
                        addToClassName = "w-50"
                        placeholder ='חפשו כתובת או עיר'
                    />
                    {searchQuery && !totalCount && <h2 className='h2 small rtl'>לא נמצאו תוצאות</h2>}
                </div>

                <ApartmentsTable
                    apartments={apartments}
                    onClick = {this.handleApartmentChosen}
                />
            </React.Fragment>

        );
    }
}
