import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import PricingParameterPrimary from './PricingParameterPrimary';
import PricingParameterView from './PricingParameterView';
import {actions} from "../../core/store";
import {connect} from "unistore/react";
import BreakdownModal from '../Cart/BreakdownModal';

const MultiplierInputByCode = ({multipliers, app, ...props}) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div>
      {
        multipliers[app].map(
          each =>
          <PricingParameterView key={ each.name}
            parent={'params.' + each.code}
            name={ each.name}
            label={each.label}
            slabs={each.slabs}
            slabConfig={each.slabConfig}
          />
        )
      }
    </div>
  )
}


export default connect(['multipliers'], actions)(MultiplierInputByCode);