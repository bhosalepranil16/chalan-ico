import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';

import { ThemeContext } from '../../contexts/ThemeContext';

const TextFormGroup = (props) => {

    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    return(
        <Form.Group>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control 
                type={props.type} 
                value={props.value} 
                onChange={(e) => {props.callback(e.target.value)}} 
                placeholder={props.placeholder} 
                required
                
                style={{background : theme.a, color : theme.d}}
            />
        </Form.Group>
    );
}

export default TextFormGroup;