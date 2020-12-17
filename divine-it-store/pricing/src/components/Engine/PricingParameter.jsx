import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import {actions} from "../../core/store";
import {connect} from "unistore/react";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


class PricingParameter extends React.Component {

    constructor(props) {
        super(props);

        const value = this.getDefaultValue(props);

        let className = ' col-12 ';
        if (props.className) className = props.className + className;
        if (props.slabConfig.className) className += props.slabConfig.className;

        let slabIndex = null;
        let selectedCustomSlab = true;

        if (props.slabConfig.showSlabs) {
          for (const each in props.slabs) {
            if (props.slabs[each] == value) {
              slabIndex = each;
              break;
            }
          }

          selectedCustomSlab = (slabIndex === null);
        }

        this.state = {
            className: className,
            selectedSlabIndex: slabIndex,
            selectedCustomSlab: selectedCustomSlab,
            added: false,
            paramValue: value
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    getDefaultValue(props) {
        let value = undefined;
        if (undefined !== props.params[props.name]) {
            value = props.params[props.name];
        }
        else if (undefined !== props.parent && undefined !== props.params[props.parent]) {
            value = props.params[props.parent];
        }
        return value;
    }

    getValue() {
        let {paramValue} = {...this.state};
        if (paramValue === undefined)
            paramValue = this.getParamConfig().stdValue;
        return paramValue;
    }


    updateValue = (name, value) => {
        this.setState({
            paramValue: value
        });
    }

    handleInputChange(event) {
        const {name, value} = event.target;
        this.updateValue(name, value);
    }

    handleSlabButtonClick(name, value, index) {
        //this.props.updateParam(name, value);
        const customSlab = (index === null);

        this.setState((prevState) => {
            return {
                selectedSlabIndex: index,
                selectedCustomSlab: customSlab,
                paramValue: value || prevState.paramValue
            }
        });
        if (value)
            this.updateValue(name, value);
    }

  handleSliderChange = (value) => {
    this.updateValue(this.props.name, value);
  }

  getParamConfig = () => {
    if (undefined === this.props.paramConfig[this.props.name]) {
      return {
        minValue: 0,
        maxValue: 50,
        stdValue: 25
      }
    }
    return this.props.paramConfig[this.props.name];
  }

  renderSliderInput = (paramValue, slabConfig) => {
    const paramConfig = this.getParamConfig();

    let horizontalLabels = {};
    //horizontalLabels[paramConfig.minValue] = 'MIN';
    horizontalLabels[paramConfig.stdValue] = 'STD\n(' + paramConfig.stdValue + ')';
    horizontalLabels[paramConfig.maxValue] = 'MAX\n(' + paramConfig.maxValue + ')';

    return (
        slabConfig.inputType === 'slider' ? 
          <Slider
            min={paramConfig.minValue}
            max={paramConfig.maxValue}
            step={slabConfig.rounding}
            value={paramValue}
            labels={horizontalLabels}
            onChange={this.handleSliderChange}
          />
        : ''
    )
  }

  renderFormInput = (paramValue, slabConfig) => {
    return (
        slabConfig.customUser 
        ? <Form.Control
          type="text"
          placeholder={this.props.label}
          aria-describedby="inputGroupPrepend"
          required
          name={this.props.name} onChange={this.handleInputChange} value={paramValue}
        />
      : ''
    )    
  }

  renderSlabButtons = (slabs, slabConfig) => {
    return (
        slabConfig.showSlabs ?
        slabs.map((slab,index) =>
        <Button 
          variant={ this.state.selectedSlabIndex == index ? 'primary' : 'secondary' }
          onClick={() => this.handleSlabButtonClick(this.props.name, slab, index)} 
          key={index} 
          value={slab}>
            {this.getDisplayValue(slabs, index, slabConfig)}
          </Button>
        )
        : ''
    )
  }

  renderSlabCustomButton = (slabConfig) => {
    return (
      slabConfig.customUser 
       ? <Button variant={this.state.selectedCustomSlab ? 'primary' : 'secondary'}
              onClick={() => this.handleSlabButtonClick(this.props.name, null, null)}
         >{slabConfig.customText ? slabConfig.customText : 'Custom'}</Button>
       : ''
      
    )
  }

    getDisplayValue = (slabs, index, slabConfig) => {
        
        let showRange = slabConfig && slabConfig.slabRange!==false;

        let rangeStart='', rangeEnd = '';
        if (showRange) {
            rangeStart = (index == 0 
                ? '1 - ' 
                : ((slabs[index - 1] + 1).toString() + ' - ')
            )

            rangeEnd = slabs[index].toString();
        }

        let title = undefined;
        if (slabConfig && slabConfig.slabTexts && slabConfig.slabTexts[index] && slabConfig.slabTexts[index].title)
            title = slabConfig.slabTexts[index].title;

        //console.log('--', title, rangeStart, rangeEnd);
        if (title === undefined) {
            if (showRange == false) 
                title = slabs[index]
            else
                title = rangeStart + rangeEnd;

            return (<>{title}</>);
        }
        else {
            if (!showRange) return (<>{title}</>);

            return (<>{title} <span className='subtext'> ({rangeStart}{rangeEnd})</span></>);
        }
    }

  renderLabel(label, helpText) {
    if (!helpText) return (<Form.Label>{label}</Form.Label>);

    return (
      <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={
        <Tooltip>{helpText}</Tooltip>
      }>
        <Form.Label>{this.props.label} <span className="helpIcon">?</span> </Form.Label>
      </OverlayTrigger>
    )
  }


  render() {
    const paramValue = this.getValue();

    let {slabs, slabConfig} = {...this.props};

    if (undefined === slabs) slabs = [];

    const sliderInput = this.renderSliderInput(paramValue, slabConfig);
    const formInput = this.renderFormInput(paramValue, slabConfig);
    const slabButtons = this.renderSlabButtons(slabs, slabConfig);
    const slabCustomButton = this.renderSlabCustomButton(slabConfig);
    const label = this.renderLabel(this.props.label, slabConfig.help);

    const formatkg = value => value + ' kg';

    return (
        <Form.Group as={Col} controlId="formGridEmail" className={this.state.className}>
          {label}

          <InputGroup>
            <InputGroup.Prepend>
              <ButtonGroup size="" className="" aria-label="First group">
                {slabButtons}
                {slabCustomButton}
              </ButtonGroup>
            </InputGroup.Prepend>
            {sliderInput}
            {formInput}
            <Form.Control.Feedback type="invalid">
              Please provide a valid input
            </Form.Control.Feedback>
        </InputGroup>

        </Form.Group>
    )
  }
}
export const PricingParameterBase = PricingParameter;
export default connect(['params'], actions)(PricingParameter);