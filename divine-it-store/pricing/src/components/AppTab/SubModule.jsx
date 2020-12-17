import React from 'react';
import Button from 'react-bootstrap/Button';
import Feature from './Feature';

class SubModule extends React.Component {

  render() {
    return (
      <div className="submodule ">
        <div className="d-flex">
          <div className="flex-grow-1">
            <div className="feature-title">
              <div className="title">{this.props.data.name}</div>
              <div className="card-desc">{this.props.data.name}</div>
            </div>

            <div className="card-images">
              <div className="card-image">XY</div>
              <div className="card-image">XY</div>
            </div>
          </div>

          <div className=" price-container">
            <div className="status-container">
            </div>
          </div>

        </div>

        <div className="card-features">
        { this.props.data.features.map((feature, index) => 
            <Feature key={feature.code} 
              code={feature.code}
              app={this.props.app}
              group={this.props.group}
              module={this.props.module}
              data={feature} 
              multipliers={this.props.multipliers}
              />
        )}
        </div>

      </div>
    )
  }
}

export default SubModule;