import React from 'react';

const PriceDisplay = ({value, className, valueText}) => {
  if (valueText) {
	  return (
	    <span className={className + ' price'}>
	      <span>{valueText}</span>
	    </span>
	  )
  }
  let val = Math.floor(value / 1000);
  let out = '';

  //console.log('--', val);
  while(val > 0) {
    const remainder = val % 100;
    if (remainder == 0) out = '00,';
    else {
      out = remainder.toString() + ',' + out;
    }
    
    val = Math.floor(val / 100);

    if (val > 0) {
      if (remainder > 0 && remainder < 10) out = '0' + out;
    }
    else break;
  }

  return (

    <span className={className + ' price'}>
      {value >= 1000 ? out : ''}
      <span>{value > 0 ? (value % 1000).toString().padStart(3, "0") : '-'}</span>
    </span>
  )
}

export default PriceDisplay;