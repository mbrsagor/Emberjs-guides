import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import {actions} from "../../core/store";
import {connect} from "unistore/react";
import PricingParameter, { PricingParameterBase } from "./PricingParameter";
import ItemConfig from '../../core/ItemConfig';

class PricingParameterPip extends PricingParameterBase {

    getItemConfig = (name) => {
      if (undefined === this.itemConfig) {
        this.itemConfig = {
          phase: undefined,
          segment: undefined
        };
        for (let each in ItemConfig.SEGMENTS) {
          // console.log(each, ItemConfig.SEGMENTS[each].pip, name);
          if (ItemConfig.SEGMENTS[each].pip == name) {
            this.itemConfig = {
              phase: ItemConfig.SEGMENTS[each].phase,
              segment: each,
              name:name
            }
            break;
            // return
          }
        }
      }
      return this.itemConfig;
    }

    updateValue = (name, value) => {
        // if (this.props.slabConfig.paramType == 'pip') {
        const paramConfig = this.getParamConfig();
        const finalValue = Math.min(Math.max(value, paramConfig.minValue), paramConfig.maxValue);
        //console.log('updatepip', this.parent);
        const itemConfig = this.getItemConfig(name);
        //console.log(itemConfig);
        this.props.updatePip(name, finalValue, itemConfig);
        // }

        this.setState({
            paramValue: finalValue
        });
    }

    getDefaultValue(props) {
        let value = undefined;
        if (undefined !== props.pip[props.name]) {
            value = props.pip[props.name];
        }
        else if (undefined !== props.parent && undefined !== props.pip[props.parent]) {
            value = props.pip[props.parent];
        }        
        return value;
    }

    getValue() {
        let {paramValue} = {...this.state};
        if (paramValue === undefined)
            paramValue = this.getParamConfig().stdValue;
        return Math.max(paramValue, this.getParamConfig().minValue);
    }

}


export default connect(['pip', 'paramConfig'], actions)(PricingParameterPip)