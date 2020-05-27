import React, { Component } from "react";
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBView,
    MDBMask,
    MDBContainer
} from "mdbreact";

class CarouselPage extends Component {
    render() {
        const {images} = this.props;
        console.log(images)
        let index = 0;
        return (
            <MDBContainer>
                <MDBCarousel
                    activeItem={1}
                    length={images.length}
                    showControls={images.length > 1}
                    showIndicators={true}
                    className="z-depth-1"
                >
                    <MDBCarouselInner>
                        {
                            images.map( image =>{
                                index++;
                            return (
                                <MDBCarouselItem itemId={index}>
                                    <MDBView>
                                        <img
                                            className="d-block w-100"
                                            src={image.link}
                                        />
                                        <MDBMask overlay="black-light" />
                                    </MDBView>
                                </MDBCarouselItem>
                            )
                        })}

                    </MDBCarouselInner>
                </MDBCarousel>
            </MDBContainer>
        );
    }
}

export default CarouselPage;