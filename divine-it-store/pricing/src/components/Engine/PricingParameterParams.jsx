import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import {actions} from "../../core/store";
import {connect} from "unistore/react";
import PricingParameter, { PricingParameterBase } from "./PricingParameter";

class PricingParameterParams extends PricingParameterBase {
  updateValue = (name, value) => {
      this.props.updateParam(name, value);

      this.setState({
          paramValue: value
      });
  }

}


export default connect(['params', 'paramConfig'], actions)(PricingParameterParams);