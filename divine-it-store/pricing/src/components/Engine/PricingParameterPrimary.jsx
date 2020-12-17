import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import {actions} from "../../core/store";
import {connect} from "unistore/react";
import PricingParameterParams from "./PricingParameterParams";
import PricingParameterPip from "./PricingParameterPip";

const PricingParameterPrimary = ({...props}) => {
	if (props.slabConfig.paramType == 'pip') {
		return (
          <PricingParameterPip {...props} />
		)
	}
	else {
		return (
          <PricingParameterParams {...props} />
		)
	}

}


export default PricingParameterPrimary;