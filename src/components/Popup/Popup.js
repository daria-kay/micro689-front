import React from "react";
import {Alert} from "react-bootstrap";

export default function Popup({success, message, update}) {
    console.log(message);
    let variant = success ? 'success' : 'danger';
    let style = {
        opacity: update ? 100 : 0,
        zindex: update ? 100 : -100,
        bottom: '100px',
        right: '100px',
        position: 'fixed'
    };
    return(
        <Alert variant={variant} style={style}>
            {message}
        </Alert>
    );
}