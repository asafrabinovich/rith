import React, {Component} from "react";
import Malfunction from "./Malfunction";
import {Container} from "@material-ui/core";
import _ from 'lodash';

export default class Malfunctions extends Component {
    render() {
        const {malfunctions,data,errors,onChange,onRemove,notifyWhenImageSelected,notifyWhenImageRemoved, viewOnly = false} = this.props;
        // const allMalfunctions = _.orderBy(malfunctions,'time','desc')
        return (
            <React.Fragment>
                {malfunctions
                    .map(malfunction => {
                        return (
                            <Container className='mt-4'>
                                <Malfunction
                                    name={ malfunction.key? malfunction.key: malfunction.type }
                                    data={data}
                                    errors={errors}
                                    onChange={onChange}
                                    onRemove={onRemove}
                                    notifyWhenImageSelected = {notifyWhenImageSelected}
                                    notifyWhenImageRemoved={notifyWhenImageRemoved}
                                    viewOnly={viewOnly}
                                    text = {malfunction.Text}
                                    images = {malfunction.photos}

                                />

                            </Container>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}