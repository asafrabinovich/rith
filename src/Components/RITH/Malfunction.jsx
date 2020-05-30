import React, {Component} from "react";
import TextAreaInput from "../Common/TextAreaInput";
import FileUploader from "../Common/FileUploader";
import {Container} from "@material-ui/core";
import {getMalfunctionProps} from "../../Services/FakeAptService";
import ImagesPreviewer from "../Common/ImagesPreviewer";
import {fakeUploadImage} from "../../Services/httpService";
import TextArea from "../Common/TextArea";
import ImagesGallery from "../Common/ImagesGallery";

export default class Malfunction extends Component{
    state = {
        files:[],
        images:[]
    }


    renderTextAreaInput = (name,numberOfRows='2',headline,subHeadline,onChange,onRemove = null,type = 'text') =>{
        const {data, errors} = this.props;
        if(name ==='livingExperience' || name ==='recommendations') {
            onRemove = null;
        }

            return <TextAreaInput
            type = {type}
            name= {name}
            value={data[name]}
            error={errors[name]}
            rows = {numberOfRows}
            onChange={event => {
                onChange(event,event.target.value);
            }}
            headline={headline}
            subHeadline={subHeadline}
            onRemove={onRemove}
        />
    };

    renderTextArea = (name,numberOfRows='2',headline,subHeadline,text,type = 'text') =>{

        return <TextArea
            type = {type}
            name= {name}
            rows = {numberOfRows}
            headline={headline}
            subHeadline={subHeadline}
            text={text}
        />
    };
    renderImagesGallery = (images)=>{
        return <Container>
            <ImagesGallery images = {images}/>
        </Container>
    };
    renderImageUploader = (name) =>{
        return <FileUploader
            name= {name}
            headline = 'הוסף תמונה'
            onChange={this.handleImageSelected}
        />
    };
    renderImagesPreviewer = () =>{
        const {images} = this.state;
        return <ImagesPreviewer images ={images} onRemove={this.handleImageRemove}/>
    };
    handleImageSelected =  async event =>{
        const {files} = this.state;
        const {notifyWhenImageSelected,name} = this.props;

        if(event.target.files[0]){
            if(!files) {
                await this.setState({files: [event.target.files[0]]});
                this.refreshImages();
            }
            else{
                const files = [...this.state.files, event.target.files[0]]
                await this.setState({files});
                this.refreshImages();

            }
        }
        notifyWhenImageSelected(this.state.files,name);
        console.log('Added:',this.state.images);

    }
    handleImageRemove = async (fileToRemove) =>{
        const {files:allFiles} = this.state;
        const {name,notifyWhenImageRemoved} = this.props;
        const files = allFiles.filter(file => file.name !== fileToRemove.name);
        await this.setState({files});
        this.refreshImages();

        notifyWhenImageRemoved(this.state.files,name);

    }


    refreshImages = ()=>{
        const {files} = this.state;
        const images = fakeUploadImage(files);
        this.setState({images});

    }
    render() {
        const {name, onRemove,onChange,type,text, viewOnly = false, images = null} = this.props;
        const {headline,subHeadline} = getMalfunctionProps(name);
        return(
            <React.Fragment>
                {!viewOnly && this.renderTextAreaInput(name ,'6',headline,subHeadline,onChange,onRemove)}
                {!viewOnly && this.renderImagesPreviewer()}
                {!viewOnly && this.renderImageUploader(name )}
                {viewOnly && this.renderTextArea(name ,'6',headline,subHeadline,text)}
                {viewOnly && this.renderImagesGallery(images)}

            </React.Fragment>
        );
    }

}