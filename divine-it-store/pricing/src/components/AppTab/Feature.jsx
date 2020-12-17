import React from 'react';
import PriceItem from './PriceItem';
import Button from 'react-bootstrap/Button';

class Feature extends React.Component {


  render() {
    return (
      <div className="feature d-flex">
          <div className="flex-grow-1">
            <div className="feature-title">
              <div className="title">{this.props.data.name}</div>
              <div className="card-desc">{this.props.data.description}</div>
            </div>

            <div className="card-images">
              <div className="card-image">XY</div>
              <div className="card-image">XY</div>
            </div>
          </div>

          <PriceItem 
            className="flex-shrink-0 d-flex flex-column flex-md-row price-container"
            code={this.props.code}
            name={this.props.name}
            app={this.props.app}
            group={this.props.group}
            module={this.props.module}
            data={this.props.data} 
            multipliers={this.props.multipliers} 
            >
            <Button className="d-none expand"></Button>

          </PriceItem>
      </div>
    )
  }

}

export default Feature;