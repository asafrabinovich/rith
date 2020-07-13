import React, {Component} from "react";
import Form from "../../Common/Form";
import Joi from "joi-browser";
import {getCurrentDate} from '../../Common/Utils/GetDate'
import {Container, GridList, GridListTile} from '@material-ui/core';
import {
    getApartment,
    getLatestPayments,
    getCities,
    getMalfunctions,
    getMalfunctionKey, getDefaultMalfunctions, saveApartmentReview
} from "../../../Services/FakeAptService";

import UploadOptionsSection from "./UploadOptionsSection";
import Malfunctions from "../Object Model/Malfunctions";
import UploadDocsSection from "./UploadDocsSection";
import DatePickerInput from "../../Common/DatePickerInput";

export default class UploadReview extends Form{
    constructor({match, history}) {
        super();
    }
    state = {
        data:{
            street:'',
            streetNumber: '',
            city: '',
            apartmentNumber:'',
            floorNumber:'',
            numberOfRooms:'',
            squareFit:'',
            ownerName:'',
            rent:'',
            waterBill:'',
            electricityBill:'',
            taxProperty:'',

        },
        malfunctions: [],
        leaseFile: null,
        idFile: null,
        errors: {},
        cities: [],
        malfunctionsOptions:[],

    };
    schema ={
        _id: Joi.string(),
        street: Joi
            .string()
            .required()
            .label('רחוב')
            .error(() => {
                return {
                    message: 'יש להזין שם רחוב',
                };
            }),
        streetNumber: Joi
            .number()
            .required()
            .label('מספר')
            .error(() => {
                return {
                    message: 'יש להזין מספר רחוב',
                };
            }),
        city: Joi
            .string()
            .required()
            .label('עיר')
            .error(() => {
                return {
                    message: 'יש לבחור עיר',
                };
            }),
        apartmentNumber: Joi
            .number()
            .required()
            .label('דירה')
            .error(() => {
                return {
                    message: 'יש להזין מספר דירה',
                };
            }),
        squareFit: Joi
            .number()
            .required()
            .integer()
            .min(0)
            .max(400000)
            .label('מ"ר')
            .error(() => {
                return {
                    message: 'יש להזין את גודל הדירה',
                };
            }),
        floorNumber: Joi
            .number()
            .required()
            .integer()
            .min(0)
            .max(400000)
            .label('קומה')
            .error(() => {
                return {
                    message: 'יש להזין את מספר הקומה',
                };
            }),
        numberOfRooms: Joi
            .number()
            .required()
            .integer()
            .min(0)
            .max(400000)
            .label('קומה')
            .error(() => {
                return {
                    message: 'יש להזין את מספר החדרים',
                };
            }),
        ownerName: Joi
            .string()
            .label('שם הבעלים'),
        rent: Joi
            .number()
            .integer()
            .min(0)
            .max(400000)
            .label('שכר דירה'),
        waterBill: Joi
            .number()
            .integer()
            .min(0)
            .max(400000)
            .label('חשבון מים'),
        electricityBill: Joi
            .number()
            .integer()
            .min(0)
            .max(400000)
            .label('חשבון חשמל'),
        taxProperty: Joi
            .number()
            .integer()
            .min(0)
            .max(400000)
            .label('ארנונה'),

    };


     async populateApartment(){
         try{
             const apartmentId = this.props.match.params.apartmentId;
             if(apartmentId === 'new') return;
             // const {data : apartment} = await getApartment(apartmentId);
             const apartment = getApartment(apartmentId);

             if(apartment._id){
                 delete apartment[apartment._id];
             }
             this.setState({data: this.mapToViewModel(apartment)});
         }catch (e) {
             if(e.response && e.response.status === 404)
             {
                 this.props.history.replace('/not-found');
             }
         }
     }
    async populateCities(){
            const cities = getCities();
        this.setState({cities});
    }
    async populateMalfunctionsOptions(){
        const malfunctionsOptions = getMalfunctions();
        this.setState({malfunctionsOptions});
    }
    async populateMalfunctions(){
        const malfunctions = await getDefaultMalfunctions();
        malfunctions.forEach(m => this.addToSchema(m.key));
        await this.setState({malfunctions});

    }

    async componentDidMount() {
         await this.populateApartment();
        await this.populateCities();
        await this.populateMalfunctionsOptions();
        await this.populateMalfunctions();
    };

    mapToViewModel(apartment) {
        const lastPayments= getLatestPayments(apartment);
        return {
            street:apartment.street,
            streetNumber: apartment.streetNumber,
            city: apartment.city,
            apartmentNumber: apartment.apartmentNumber,
            numberOfRooms: apartment.numberOfRooms,
            floorNumber: apartment.floorNumber,
            squareFit: apartment.squareFit,
            ownerName:apartment.ownerDocument
        }
    }

    handleMalfunctionChosen =  async chosenMalfunction =>{
        const allMalfunctions = this.state.malfunctions;
        const malfunction = {name:chosenMalfunction.name,text:'',key: chosenMalfunction.key, files:[], time: Date.now()}
        const malfunctions =[malfunction,...allMalfunctions];
        await this.setState({malfunctions});
        this.addToSchema(chosenMalfunction.key);
        this.removeFromOptions(chosenMalfunction);
    };
    addToSchema =(name)=>{
        let message = 'אנא מלאו שדה זה או לחצו על "הסר"';
        if(name === 'livingExperience' || name === 'recommendations'){
            message = 'שדה זה הוא חובה';
        }
        const add = Joi
            .string()
            .required()
            .error(() => {
                return {
                    message: message,
                };
            })
        this.schema[name] = add;

    }
    removeFromSchema =(name)=>{
        delete this.schema[name];
    }
    addToOptions =  (optionKey)=>{
        const allMalfunctionOptions = getMalfunctions();
        const malfunctionToOptionObject = allMalfunctionOptions.filter(malfunction => malfunction.key === optionKey );
        const malfunctionsOptions = [...this.state.malfunctionsOptions, ...malfunctionToOptionObject];
        this.setState({malfunctionsOptions});
    }
    removeFromOptions = (option)=>{
        let malfunctionsOptions = [...this.state.malfunctionsOptions];
        malfunctionsOptions = malfunctionsOptions.filter(m => m.name !== option.name);
        this.setState({malfunctionsOptions});
    }
    handleRemove = async (malfunctionToRemove)=>{
        const allMalfunctions = this.state.malfunctions;
        let malfunctions =[...allMalfunctions];
        malfunctions = malfunctions.filter(malfunction => malfunction.key !== malfunctionToRemove);
        await this.setState({malfunctions});
        this.removeFromSchema(malfunctionToRemove);
        this.addToOptions(malfunctionToRemove);
    }
    handleImageSelected = async (inputFiles, inputKey) =>{
        const malfunctions = [...this.state.malfunctions];
        const object = malfunctions.find(m=> m.key===inputKey);
        const index = malfunctions.indexOf(object);
        malfunctions[index] = {...malfunctions[index]};
        malfunctions[index].files = [...inputFiles];
       await this.setState({malfunctions});
    }
    handleImageRemoved = async (inputFiles, inputKey) =>{
        this.handleImageSelected(inputFiles, inputKey);
    }
    handleLeaseSelected = file =>{
        const leaseFile = file;
        this.setState({leaseFile})
    };
    handleIdSelected= file=>{
        const idFile = file;
        this.setState({idFile})
    };
    handleMalfunctionChange = async ({currentTarget : input},text)=>{
        this.handleChange({currentTarget : input});
        const malfunctions = [...this.state.malfunctions];
        let malfunctionToUpdate = malfunctions.find(m=> m.key===input.name);
        const index = malfunctions.indexOf(malfunctionToUpdate);
        malfunctionToUpdate.text = text;
        malfunctions[index] = {...malfunctionToUpdate};
        await this.setState({malfunctions});
    }
    validateUploadedDocs = ()=>{
        const {idFile,leaseFile} =this.state;
        return (idFile && leaseFile) ? false:true;
    }
    buildApartmentJson =  ()=>{
        const {street,streetNumber,city,apartmentNumber, floorNumber, squareFit, ownerName, rent, waterBill, electricityBill, taxProperty} = this.state.data;
        const {malfunctions,leaseFile,idFile} = this.state;
        const json ={
            "createDate": getCurrentDate(),
            "userID": "1",
            "rentalPeriod": "2018-05-10 - 2019-05-10",
            "lastRent": rent,
            "lastWaterBill": waterBill,
            "lastElectrictyBill": electricityBill,
            "propertyTax": taxProperty,
            "listOfMalfunctions": malfunctions,
            "ratingStatus": 5,
            "status":"pending",
            "contract": leaseFile,
            "identificationCard":idFile,
            "street": street,
            "streetNumber": streetNumber,
            "city": city,
            "apartmentNumber": apartmentNumber,
            "floorNumber": floorNumber,
            "squareFit": squareFit,
            "ownerName": ownerName
        }
        return json;
    }

    doSubmit = async () =>{
        const apartmentJson = this.buildApartmentJson();
        await saveApartmentReview(apartmentJson);
        //
        // this.props.history.push('/thank-you');
    };

    render(){
        const {malfunctionsOptions,malfunctions,data,errors} = this.state;
        return (
            <React.Fragment>
                <Container className= ' rtl w-75'>
                    <Container>
                        <h1 className='text-center'>העלת ביקורת</h1>
                        <h2 className='mt-3 '>פרטים "יבשים"</h2>
                        <h6 className='mb-4 '>אנא מלאו את השדות הבאים:</h6>
                    </Container>

                    <form onSubmit= {this.handleSubmit} >
                        <GridList cols={3}>
                            <GridListTile className='h-auto ' >
                                <Container>
                                    {this.renderInput('street', 'רחוב')}
                                    {this.renderInput('streetNumber', 'מספר')}
                                    {this.renderSelect('city', 'עיר', this.state.cities)}
                                    {this.renderInput('apartmentNumber', 'מספר דירה')}
                                </Container>
                            </GridListTile>

                            <GridListTile className='h-auto ' >
                                <Container className='w-75'>
                                    {this.renderInput('floorNumber', 'קומה')}
                                    {this.renderInput('numberOfRooms', 'מספר חדרים')}
                                    {this.renderInput('squareFit', 'שטח במ"ר')}
                                    {this.renderInput('ownerName', 'שם הבעלים')}

                                </Container>
                            </GridListTile>

                            <GridListTile className='h-auto ' >
                                <Container className='w-75'>
                                    {this.renderInput('rent', 'שכ"ד')}
                                    {this.renderInput('waterBill', 'חשבון מים')}
                                    {this.renderInput('electricityBill', 'חשבון חשמל')}
                                    {this.renderInput('taxProperty', 'ארנונה')}
                                </Container>
                            </GridListTile>
                        </GridList>

                        <Container >
                            <UploadDocsSection
                                onLeaseSelected = {this.handleLeaseSelected}
                                onIdSelected = {this.handleIdSelected}
                            />
                        </Container>
                        <Container>
                            <Malfunctions
                                malfunctions={malfunctions}
                                data = {data}
                                errors = {errors}
                                onChange ={this.handleMalfunctionChange}
                                onRemove ={this.handleRemove}
                                notifyWhenImageSelected = {this.handleImageSelected}
                                notifyWhenImageRemoved = {this.handleImageRemoved}

                            />
                        </Container>
                        <Container>
                            {this.renderButton('סיים ושלח ביקורת', this.validateUploadedDocs)}
                        </Container>
                    </form>
                    <Container className=' h-auto mt-3 '>
                        <UploadOptionsSection
                            buttonText='+ הוסף ביקורת ספציפית'
                            onClick={this.handleMalfunctionChosen}
                            text= "לחץ כדי לספר על תקלה ספציפית, לדוגמה: בעיה בצנרת הדירה"
                            itemsForModal = {malfunctionsOptions}
                        />
                    </Container>
                </Container>
            </React.Fragment>

        )
    };
}
