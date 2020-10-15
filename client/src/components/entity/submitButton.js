import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';

import { ThemeContext } from '../../contexts/ThemeContext';

const SubmitButton = (props) => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    return(
        <Form.Control type="submit" className="btn btn-outline-primary d-block mx-auto my-4" style={{width: 150, background: theme.syntax}}/>
    );
}

export default SubmitButton;