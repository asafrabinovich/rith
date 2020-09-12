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
    getMalfunctionKey, getDefaultMalfunctions, saveApartmentReview,
    //editApartmentReview
} from "../../../Services/FakeAptService";

import UploadOptionsSection from "./UploadOptionsSection";
import Malfunctions from "../Object Model/Malfunctions";
import UploadDocsSection from "./UploadDocsSection";
import DatePickerInput from "../../Common/DatePickerInput";
import {uploadFile} from "../../../Services/httpService";
import { Rating } from '@material-ui/lab';

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
            ratingStatus: 0,
            mainPhoto:''

        },
        malfunctions: [],
        leaseFile: null,
        idFile: null,
        errors: {},
        cities: [],
        malfunctionsOptions:[],
        isEditMode:false
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
        ratingStatus: Joi
            .number()
            .integer()
            .min(0)
            .max(5),
        mainPhoto: Joi


    };


    async populateApartment(){
         try{
             const apartmentId = this.props.match.params.apartmentId;
             const reviewId = this.props.match.params.reviewId;
             if (apartmentId === 'new') return;
             const apartment = await getApartment(apartmentId);


             // console.log("apartment",apartment)
             //
             // console.log("review",review)
             if (apartment._id) {
                 delete apartment[apartment._id];
             }
             let review;
             if (reviewId) {
                 review = {...apartment.reviews.filter(review => review.id === reviewId)};
                 this.mapToViewModel(apartment, review[0])
             } else {
                 this.mapToViewModel(apartment);
             }
         }catch (e) {
             if(e.response && e.response.status === 404)
             {
                 this.props.history.replace('/not-found');
             }
         }
     }
    async populateCities(){
        const cities = await getCities();
        this.setState({cities});
    }
    async populateMalfunctionsOptions(){
        const malfunctionsOptions = getMalfunctions();
        this.setState({malfunctionsOptions});
    }
    async populateMalfunctions(){
        const reviewId = this.props.match.params.reviewId;
        if (!reviewId) {
            const malfunctions = await getDefaultMalfunctions();
            malfunctions.forEach(m => this.addToSchema(m.key));
            await this.setState({malfunctions});
        }


    }

    updateEditModeState(){
        const isEditMode = this.props.match.params.isEditMode;
        if(isEditMode){
            this.setState({isEditMode:isEditMode});
        }
        console.log("isEditMode: " + this.state.isEditMode);
    }

    async componentDidMount() {
        await this.populateCities();
        await this.populateMalfunctionsOptions();
        await this.populateApartment();
        await this.populateMalfunctions();
        this.updateEditModeState();
    };

    async mapToViewModel(apartment, review = null) {
        let data;
        let apartmentFields = {
            street: apartment.street,
            streetNumber: apartment.streetNumber,
            apartmentNumber: apartment.apartmentNumber,
            numberOfRooms: apartment.numberOfRooms,
            floorNumber: apartment.floorNumber,
            squareFit: apartment.squareFit,
            ownerName: apartment.ownerName,
            city: apartment.city,
            ratingStatus: 0,

        }

        if (review) {
            let reviewFields = {
                rent: review.lastRent,
                waterBill: review.lastWaterBill,
                electricityBill: review.lastElectricityBill,
                taxProperty: review.propertyTax,
                ratingStatus: review.ratingStatus,
                mainPhoto: review.mainPhoto
            }
            data = {...apartmentFields, ...reviewFields};
            await this.setState({
                data: data,
                malfunctions: review.listOfMalfunctions,
                leaseFile: review.contract,
                idFile: review.identificationCard,
                isEditMode: true
            });
            this.updateSchema();
        } else {
            data = {...apartmentFields};
            await this.setState({data: data});
        }
    }

    updateSchema = () => {
        const {malfunctions} = this.state;
        malfunctions.forEach(m => {
            this.addToSchema(m.key);
            this.removeFromOptions({name: m.name, key: m.key});
        })
    }
    handleMalfunctionChosen = async chosenMalfunction => {
        const allMalfunctions = this.state.malfunctions;
        const malfunction = {
            name: chosenMalfunction.name,
            text: '',
            key: chosenMalfunction.key,
            files: [],
            time: Date.now()
        }
        const malfunctions = [...allMalfunctions, malfunction];
        this.addToSchema(chosenMalfunction.key);
        this.removeFromOptions(chosenMalfunction);
        await this.setState({malfunctions});
    };
    addToSchema = (name) => {
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
    handleIdSelected= async file=>{
        const idFile = await uploadFile(file);
        this.setState({idFile})
    };
    handleLeaseSelected = async file =>{
        const leaseFile = await uploadFile(file);;
        this.setState({leaseFile})
    };
    handleScoreSelected =  (ratingStatus) =>{
        const data = {...this.state.data};
        data["ratingStatus"]= parseInt(ratingStatus);
        this.setState({data});

    }
    handleMalfunctionChange = async ({currentTarget : input},text)=>{
        this.handleChange({currentTarget : input});
        const malfunctions = [...this.state.malfunctions];
        let malfunctionToUpdate = malfunctions.find(m=> m.key===input.name);
        const index = malfunctions.indexOf(malfunctionToUpdate);
        malfunctionToUpdate.text = text;
        malfunctions[index] = {...malfunctionToUpdate};
        await this.setState({malfunctions});
    }

    validateSubmission = ()=>{
        return (this.validateUploadedDocs())
    }
    validateUploadedDocs = ()=>{
        const {idFile,leaseFile} =this.state;
        return (idFile && leaseFile) ? true : false;
    }
    validateChosenCity =() =>{
        const {city} = this.state.data;
        let res = (city.key == "Default")?  false :  true;
        return res
    }
    setMainPhoto = async()=> {
        const {malfunctions} = this.state;
        let mainPhoto;
        malfunctions.forEach(malfunction => {//Check error 4
                if (!this.state.data.mainPhoto && !mainPhoto && malfunction.files.length > 0) {
                    mainPhoto = malfunction.files[0].fileName;
                }
            }
        );
        const data = {...this.state.data};
        if (mainPhoto) {
            data["mainPhoto"] = mainPhoto;
            this.setState({data});
        }
    }
    buildApartmentJson =  ()=>{
        const {street,streetNumber,city,apartmentNumber, floorNumber, squareFit, ownerName, rent, waterBill, electricityBill, taxProperty,numberOfRooms,ratingStatus,mainPhoto} = this.state.data;
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
            "ratingStatus": ratingStatus,
            "status":"pending",
            "contract": leaseFile,
            "identificationCard":idFile,
            "street": street,
            "streetNumber": parseInt(streetNumber),
            "city": city,
            "apartmentNumber": parseInt(apartmentNumber),
            "floorNumber": parseInt(floorNumber),
            "squareFit": parseInt(squareFit),
            "ownerName": ownerName,
            "numberOfRooms":parseInt(numberOfRooms),
            "mainPhoto":mainPhoto,

        }
        return json;
    }

    doSubmit = async () => {
        await this.setMainPhoto();
        const apartmentJson = this.buildApartmentJson();
        this.state.isEditMode ? await saveApartmentReview(apartmentJson, this.props.match.params.reviewId)
            : await saveApartmentReview(apartmentJson);


        this.props.history.push('/thank-you');
    };



    render() {
        const {malfunctionsOptions, malfunctions, data, errors, leaseFile, idFile} = this.state;
        const {ratingStatus} = this.state.data;
        console.log("leaseFile out", leaseFile)

        return (
            <React.Fragment>
                <Container className=' rtl w-75'>
                    <Container className='mb-3'>
                        <h1 className='text-center'>העלת ביקורת</h1>
                        <h2 className='mt-3 '>פרטים "יבשים"</h2>
                        <h6 className='mb-4 '>אנא מלאו את השדות הבאים:</h6>
                        <p>דירוג כללי:</p>
                        <Rating dir="ltr" name="simple-controlled" value={ratingStatus} size="large"
                                onChange={(e) => this.handleScoreSelected(e.target.value)}/>

                    </Container>

                    <form onSubmit= {this.handleSubmit} >
                        <GridList cols={3}>
                            <GridListTile className='h-auto ' >
                                <Container>
                                    {this.renderInput('street', 'רחוב')}
                                    {this.renderInput('streetNumber', 'מספר')}
                                    {this.renderSelect('city', 'עיר', this.state.cities, this.state.data.city)}
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
                                leaseFile={leaseFile}
                                idFile={idFile}
                                onLeaseSelected={this.handleLeaseSelected}
                                onIdSelected={this.handleIdSelected}
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
                            {this.renderButton('סיים ושלח ביקורת', this.validateSubmission)}
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
