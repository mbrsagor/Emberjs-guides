import React from 'react';
import {actions} from "./store";
import {connect} from "unistore/react";

const maximize = (size) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-maximize-2">
        <polyline points="15 3 21 3 21 9"></polyline>
        <polyline points="9 21 3 21 3 15"></polyline>
        <line x1="21" y1="3" x2="14" y2="10"></line>
        <line x1="3" y1="21" x2="10" y2="14"></line>
    </svg>
);

const minimize = (size) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-minimize-2">
        <polyline points="4 14 10 14 10 20"></polyline>
        <polyline points="20 10 14 10 14 4"></polyline>
        <line x1="14" y1="10" x2="21" y2="3"></line>
        <line x1="3" y1="21" x2="10" y2="14"></line>
    </svg>
);

const FullScreenBtn = (props) => (
    <button className="btn btn-sm" onClick={() => props.toggleFullscreen()}>
        {props.isFullScreen ? minimize(16) : maximize(16)}
    </button>
);


export default connect(['isFullScreen'], actions)(FullScreenBtn);
