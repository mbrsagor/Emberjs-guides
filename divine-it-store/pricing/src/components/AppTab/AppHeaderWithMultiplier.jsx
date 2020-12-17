import React, {setState} from 'react';
import Button from 'react-bootstrap/Button';
import ModuleGroup from './ModuleGroup';
import {actions} from "../../core/store";
import {connect} from "unistore/react";
import MultiplierInputByCode from '../Engine/MultiplierInputByCode'
import Card from 'react-bootstrap/Card';
import PricingParameterView from '../Engine/PricingParameterView';
import PricingParameterPrimary from '../Engine/PricingParameterPrimary';

class AppHeaderWithMultiplier extends React.Component {

  constructor(props){
    super(props);
    const hasMultipliers = props.multipliers[props.app] && props.multipliers[props.app].length != 0;
    this.state={
        show:true,
        hasMultipliers: hasMultipliers
    };
  }

  handleClose = () => {this.setState({show:false})};
  handleShow = () => {this.setState({show: true})};

  renderMultiplierSection = (multipliers, app) => {
    if (!this.state.hasMultipliers) return '';

    return (
          <Card className="multiplier-container" border="primary">
            <Card.Header>
                
                {
                    this.state.show
                    ? 
                        <>
                            <Button className="button-right" size="sm" variant="primary" onClick={this.handleClose}>Save Changes</Button>
                            <Card.Title>Licensing Parameters</Card.Title>
                        </>
                    : 
                    <>
                        <Button className="button-right" variant="primary" size="sm" onClick={this.handleShow}>Change</Button>
                        <MultiplierInputByCode app={app} />
                    </>
                }
            </Card.Header>

            {this.state.show
            ?
            <Card.Body className="row">
                  {
                    multipliers[app].map(
                      each =>
                      <PricingParameterPrimary key={ each.name}
                        parent={'params.' + each.code}
                        name={ each.name}
                        label={each.label}
                        slabs={each.slabs}
                        slabConfig={each.slabConfig}
                        className={each.slabConfig.hideInApp ? 'd-none' : ''}
                      />
                    )
                  }
            </Card.Body>
            : ''
            }
          </Card>
    )
  }

  render = () => {

    const {app, title, multipliers} = this.props;
    const multiplierSection = this.renderMultiplierSection(multipliers, app);

    return (
        <>
          <h2>{title}</h2>
          {multiplierSection}
        </>
    )
  }
}
              
export default connect(['multipliers'], actions)(AppHeaderWithMultiplier);

