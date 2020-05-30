import React, {Component} from "react";
import {Modal,Button} from 'react-bootstrap'
import ListGroup from "../../Common/ListGroup";
export default class MalfunctionsModal extends Component {
    state = {
        show: false,
        chosenMalfunction: null
    }


    handleClose = () => {
        const show = false;
        const chosenMalfunction = null
        this.setState({show,chosenMalfunction});
    }
    handleShow = () => {
        const show = true;
        this.setState({show});
    }
    validateMalfunctionChosen = ()=>{
      return !this.state.chosenMalfunction;
    };
    render() {
        const {show} = this.state;
        const {items,onItemSelected,launchButtonText} = this.props;
        const {chosenMalfunction} = this.state;
        return (
            <React.Fragment>
                <button className="btn btn-secondary" onClick={this.handleShow}>
                    {launchButtonText}
                </button>

                <Modal show={show} onHide={this.handleClose} className = 'rtl'>
                    <h2 className='m-2'>בחר תקלה:</h2>
                    <h6 className='m-2'>בחירה באחת האפשרויות תוסיף שדה בו לתת מידע נוסף</h6>
                    <ListGroup
                        items ={items}
                        selectedItem={chosenMalfunction}
                        onItemSelected={(chosenMalfunction)=>{
                            this.setState({chosenMalfunction})
                        }}
                    />
                    <div className="modal-footer rtl mt-3">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            style ={{marginLeft: "auto"}}
                            onClick={this.handleClose}
                        >
                            סגור
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            disabled={this.validateMalfunctionChosen()}
                            onClick={()=>{
                                this.handleClose()
                                onItemSelected(chosenMalfunction)
                            }}
                        >בחר</button>
                    </div>

                </Modal>
            </React.Fragment>
        );
    }
}