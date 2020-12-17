import React from 'react'
import PricingParameter from './PricingParameter';
import {actions} from "../../core/store";
import {connect} from "unistore/react";


class MultiplierInputGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };
    }

    render() {
        return (
            <div className="multiplier-input-group">

                <div className="row">
                    {this.props.multipliers.map(multiplier =>
                        <PricingParameter
                            key={multiplier.name}
                            parent={'params.' + multiplier.code}
                            name={multiplier.name}
                            label={multiplier.label}
                            valueSource={multiplier.sources}
                            slabs={multiplier.slabs}
                        />)
                    }
                </div>
            </div>
        )
    }
}

export default connect([], actions)(MultiplierInputGroup);