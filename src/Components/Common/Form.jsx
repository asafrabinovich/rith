import React, {Component} from "react";
import Joi from 'joi-browser';
import Input from "./Input";
import Select from "./Select";
import TextAreaInput from "./TextAreaInput";
import FileUploader from "./FileUploader";
import Label from "./Label";

export default class Form extends Component{
    state = {
        data: {},
        error:{},
        selectedFile:null,
        files:[]
    };
    validate = () =>{
        const options = {abortEarly:false};
        const {error} = Joi.validate(this.state.data, this.schema,options);
        if(!error) return null;
        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;

        return errors;
    };
    validateProperty = ({name,value}) => {
        const obj ={[name] : value};
        const schema = {[name] : this.schema[name]};
        const {error} = Joi.validate(obj, schema)
        return error ? error.details[0].message : null;
    };
    handleSubmit = event =>{
        event.preventDefault();
        const errors = this.validate();

        this.setState({errors: errors || {}});
        if(errors) return;

        this.doSubmit();
    };
    handleChange = ({currentTarget : input})    =>{
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage){
            errors[input.name] = errorMessage;

        }
        else{
            delete errors[input.name];
        }

        const data = {...this.state.data};
        data[input.name]= input.value;
        this.setState({data, errors});
    };

    renderButton = (label,addToValidation = ()=> {return true}) => {
        return <button
            disabled={this.validate() || !addToValidation()}
            className="btn btn-primary float-left"
        >
            {label}
        </button>
    }

    renderInput = (name, label, type = 'text', isDisabled = false) => {
        const {data, errors} = this.state;
        return <Input
            type={type}
            name={name}
            value={data[name]}
            label={label}
            error={errors[name]}
            onChange={this.handleChange}
            disabled={isDisabled}
        />
    };
    renderSelect = (name, label, options, selectedOption = null) => {
        const {data, errors} = this.state;
        return <Select
            name={name}
            key={name}
            value={data[name]}
            label={label}
            error={errors[name]}
            options={options}
            selectedOption={selectedOption}
            onChange={this.handleChange}
        />
    };
    renderTextAreaInput = (name,numberOfRows='2',headline,subHeadline,onRemove = null,type = 'text') =>{
        const {data, errors} = this.state;
        return <TextAreaInput
            type = {type}
            name= {name}
            value={data[name]}
            error={errors[name]}
            rows = {numberOfRows}
            onChange={this.handleChange}
            headline={headline}
            subHeadline={subHeadline}
            onRemove={onRemove}
        />
    };
    renderLabel = (name, value) =>{
        return <Label
            name= {name}
            value={value}
        />
    };
    renderFileUploader = (name) =>{
        const {data, errors} = this.state;
        return <FileUploader
             name= {name}
            // value={data[name]}
            // onChange={this.handleFileSelected}
        />
    };

}