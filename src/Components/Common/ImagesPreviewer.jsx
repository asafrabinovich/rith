import React,{Component} from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import {GridList, GridListTile} from "@material-ui/core";

export default class ImagesPreviewer extends Component{ //continue

    render() {
        const {images,onRemove} = this.props;
        console.log("images: ", images)
        return(
            <GridList cols={5}>
                {images.map(image =>{
                    return <GridListTile className='h-auto ' >
                        <div className="container" onMouseEnter=''>
                            <img src={image.fileURL} className='image' />
                            <button className="btn btn-sm" onClick={()=>{onRemove(image)}}>x</button>
                        </div>
                    </GridListTile>
                })}
            </GridList>

    )
    }
}

