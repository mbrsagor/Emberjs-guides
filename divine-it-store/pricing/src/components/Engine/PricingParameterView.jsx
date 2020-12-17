import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import {actions} from "../../core/store";
import {connect} from "unistore/react";
import PricingParameter, { PricingParameterBase } from "./PricingParameter";
import Col from "react-bootstrap/Col";

class PricingParameterView extends PricingParameterBase {

  render() {
    // for (var each in this.props.valueSources) {
    //   console.log('value source found');
    // }
    let {slabs, slabConfig} = {...this.props};
    if (undefined === slabs) slabs = [];

    let paramValue = this.getValue();

    let showCustom = true;
    let index;
    let displayValue;

    for (let each in slabs) {
      if (paramValue == slabs[each]) {
        showCustom = false;
        displayValue = this.getDisplayValue(slabs, each, this.props.slabConfig);
        break;
      }
    }

    const customText = this.props.slabConfig.customText || 'Custom';

    return (
      <div className="parameter-view">
          <InputGroup size="">
              <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">{this.props.label}</InputGroup.Text>
                  <ButtonGroup size="" className="" aria-label="First group">
                    { showCustom 
                      ? <Button disabled variant='dark'>{customText}: {paramValue}</Button>
                      : <Button disabled variant='dark'>{displayValue}</Button>
                    }
                  </ButtonGroup>
              </InputGroup.Prepend>
          </InputGroup>
      </div>
    )
  }
}


export default connect(['params', 'paramConfig'], actions)(PricingParameterView);