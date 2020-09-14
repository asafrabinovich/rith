import React, {Component} from "react";
import TextAreaInput from "../../Common/TextAreaInput";
import FileUploader from "../../Common/FileUploader";
import {Container} from "@material-ui/core";
import {getMalfunctionProps} from "../../../Services/FakeAptService";
import ImagesPreviewer from "../../Common/ImagesPreviewer";
import {uploadFile} from "../../../Services/httpService";
import TextArea from "../../Common/TextArea";
import ImagesGallery from "../../Common/ImagesGallery";

export default class Malfunction extends Component {
    state = {
        files: []
    }

    componentDidMount() {
        const {images} = this.props;
        // let files = [];
        // images.forEach(m => {
        //     files = [...files, {fileURL: m.fileURL}]
        // })
        this.setState({files: images})
    };

    renderTextAreaInput = (name, numberOfRows = '2', headline, subHeadline, onChange, onRemove = null, text = null, images = null, type = 'text') => {
        const {data, errors} = this.props;
        if (name === 'livingExperience' || name === 'recommendations') {
            onRemove = null;
        }

        return <TextAreaInput
            type={type}
            name={name}
            // value={data[name]}
            error={errors[name]}
            rows = {numberOfRows}
            onChange={event => {
                onChange(event,event.target.value);
            }}
            headline={headline}
            subHeadline={subHeadline}
            onRemove={onRemove}
            text={text}
        />
    };
    renderTextArea = (name,numberOfRows='2',headline,subHeadline,text,type = 'text') =>{

        return <TextArea
            type = {type}
            name= {name}
            rows = {numberOfRows}
            headline={headline}
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
        const {files} = this.state;
        return <ImagesPreviewer images ={files} onRemove={this.handleImageRemove}/>
    };
    handleImageSelected =  async event =>{
        const {files} = this.state;
        const {notifyWhenImageSelected,name} = this.props;
        const selectedFile = event.target.files[0];

        if(selectedFile){
            const uploadedFile = await uploadFile(selectedFile);
            if(!files) {
                await this.setState({files: [uploadedFile]});
            }
            else{
                const files = [...this.state.files, uploadedFile];
                await this.setState({files});
            }

        }
        notifyWhenImageSelected(this.state.files,name);
    }
    refreshImages = async => {
        const {files} = this.state;
        // let images = [];
        // files.forEach(file=> images = [...images,{name:file.fileName,url:file.fileURL, key:file.filename}]);
        this.setState({images: files});
    }
    handleImageRemove = async (fileToRemove) =>{
        const {files:allFiles} = this.state;
        const {name, notifyWhenImageRemoved} = this.props;
        const files = allFiles.filter(file => file !== fileToRemove);
        await this.setState({files});
        this.refreshImages();
        notifyWhenImageRemoved(this.state.files,name);
    }



    render() {
        const {name, onRemove, onChange, text, viewOnly = false, images = null} = this.props;
        const {headline, subHeadline} = getMalfunctionProps(name);
        return (
            <React.Fragment>
                {!viewOnly && this.renderTextAreaInput(name, '6', headline, subHeadline, onChange, onRemove, text, images)}
                {!viewOnly && this.renderImagesPreviewer()}
                {!viewOnly && this.renderImageUploader(name)}
                {viewOnly && this.renderTextArea(name, '6', headline, subHeadline, text)}
                {viewOnly && this.renderImagesGallery(images)}

            </React.Fragment>
        );
    }

}