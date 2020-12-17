
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {actions} from "../../core/store";
import {connect} from "unistore/react";

import MultiplierInputByCode from '../Engine/MultiplierInputByCode'

class Parameters extends React.Component {
  constructor(props) {
    super(props);
    const multipliers = this.buildMultipliers(props.configData);
    this.state = {
      multipliers: multipliers
    };
  }

  buildMultipliers = (ProductList) => {
    const GLOBAL = 'global';

    let multipliers = {};
    for (const app in ProductList) {
      const appCode = ProductList[app].code;
      for (const mg in ProductList[app].moduleGroups) {
        for (const i in ProductList[app].moduleGroups[mg].multipliers) {
          const m = ProductList[app].moduleGroups[mg].multipliers[i];

          if (undefined !== multipliers[m.code]) {
            multipliers[m.code].app = GLOBAL;
            continue;
          }

          let o = {};
          for (let k in m) {
            o[k] = m[k];
          }
          o.name = 'params.' + m.code;
          o.app = appCode;
          multipliers[m.code] = o;
        }
      }
    }
    return multipliers;
  }

  render() {
    return (
      <div>
        <h4>Global</h4>
        <MultiplierInputByCode 
          multipliers={this.state.multipliers} 
          code="branches"
        />

        <h4>Financial Management System</h4>

        <MultiplierInputByCode 
          multipliers={this.state.multipliers} 
          code="accounts"
        />
      </div>
    )
  }
}

export default connect(['configData'], actions)(Parameters);
