import React from 'react'
import Button from 'react-bootstrap/Button';
import Feature from './Feature';
import PriceItem from './PriceItem';
import SubModule from './SubModule';
import {actions} from "../../core/store";
import {connect} from "unistore/react";

class Module extends React.Component {

    constructor(props) {
        super(props);
        this.state = {expanded: true};
    }

    render() {

        return (
            <div className="card-container">
                <div className="module-head d-flex align-items-middle">
                    <div className="flex-grow-1">
                        {this.props.data.selfCode.length <= 3 
                        ?
                        (
                            <div 
                                className={'card-icon' + (this.props.data.selfCode.length <= 2 ? '' : ' c' + this.props.data.selfCode.length) }
                                title={this.props.data.code}>
                                {this.props.data.selfCode}
                            </div>
                        )
                        : 
                        (
                            <div 
                                className='card-icon c4'
                                title={this.props.data.code}>
                                <div>{this.props.data.selfCode.substring(0,2)}</div>
                                <div>{this.props.data.selfCode.substring(2)} </div>
                            </div>
                            )
                        }

                        <div className="card-summary-container">
                            <h4 className="card-title">
                                {this.props.data.name}
                            </h4>
                            <span className="card-desc">
                {this.props.data.description}
              </span>
                        </div>

                        <div className="card-images">
                            <div className="card-image">XY</div>
                            <div className="card-image">XY</div>
                        </div>

                    </div>
                    <PriceItem
                        className="flex-shrink-0 d-flex flex-column flex-md-row"
                        code={this.props.code}
                        name={this.props.data.name}
                        app={this.props.app}
                        group={this.props.group}
                        data={this.props.data}
                        multipliers={this.props.multipliers}
                        isModule={true}
                    >

                    </PriceItem>

                </div>

                <div className={this.state.expanded ? 'card-features' : 'card-features d-none'}>
                    {this.props.data.submodules.map((submodule, index) => 
                        <SubModule key={index} 
                            code={submodule.code}
                            app={this.props.app}
                            group={this.props.group}
                            module={this.props.code}
                            data={submodule}
                            multipliers={this.props.multipliers}
                            />
                    )}
                </div>

                <div className={this.state.expanded ? 'card-features' : 'card-features d-none'}>
                    {this.props.data.features.map((feature, index) => 
                        <Feature key={index}
                            code={feature.code}
                            app={this.props.app}
                            group={this.props.group}
                            module={this.props.code}
                            data={feature}
                            multipliers={this.props.multipliers}
                         />
                    )}
                </div>
            </div>
        )
    }
}

export default connect([], actions)(Module);