import React, {Component} from "react";
import MalfunctionsModal from "../../Modals/MalfunctionsModal";
import {Container, GridList, GridListTile} from "@material-ui/core";
import FileUploader from "../../Utils/FileUploader";
import Approved from "../../../Resources/Images/Approved.png"
import Disapproved from "../../../Resources/Images/Disapproved.png"

export default class UploadDocsSection extends Component{
    state= {
            leaseFile: false,
            idFile: false
        }

    render() {
        const {onLeaseSelected,onIdSelected} = this.props;
        const {leaseFile,idFile} = this.state;
        return (
            <React.Fragment c>
                <h2>העלת מסמכים</h2>
                <h6 className='float-left mb-4'>אנחנו בשם האתר רוצים לשמור על מהימנות הביקורות שעולות לאתר, לכן אנו מבקשים שתעלו מסמך המוכיח את שהותכם בדירה. כמו כן אנו מבקשים מסמך מזההה (ת.ז או רשיון)</h6>
                <GridList cols={2}>
                    <GridListTile className='h-auto ' name='leaseFile' >
                        <Container>
                            <GridList cols={3}>
                                <GridListTile className='h-auto w-25' >
                                    <Container>
                                        {leaseFile && <img src= {Approved} className='mt-5 mr-5'/>}
                                        {!leaseFile && <img src= {Disapproved} className='mt-5 mr-5'/>}

                                    </Container>
                                </GridListTile>
                                <GridListTile className='h-auto ' >
                                    <FileUploader headline = 'העלה חוזה' onChange={(event)=>{
                                        const leaseFile = event.target.files[0];
                                        onLeaseSelected(leaseFile);
                                        this.setState({leaseFile:true})
                                    }}/>
                                </GridListTile>
                            </GridList>

                        </Container>
                    </GridListTile>
                    <GridListTile className='h-auto ' >
                        <Container>
                            <GridList cols={2}>
                                <GridListTile className='h-auto w-25' >
                                    <Container>
                                        {idFile && <img src= {Approved} className='mt-5 mr-5'/>}
                                        {!idFile && <img src= {Disapproved} className='mt-5 mr-5'/>}

                                    </Container>
                                </GridListTile>
                                <GridListTile className='h-auto ' >
                                    <FileUploader headline = 'העלה ת.ז\רשיון' onChange={(event)=>{
                                        const idFile = event.target.files[0];
                                        onIdSelected(idFile);
                                        this.setState({idFile:true});
                                    }}/>
                                </GridListTile>
                            </GridList>
                        </Container>
                    </GridListTile>

                </GridList>
            </React.Fragment>
        );
    }
}
