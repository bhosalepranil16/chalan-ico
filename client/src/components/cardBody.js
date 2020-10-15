import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';

import { ThemeContext } from '../contexts/ThemeContext';

const CardBody = (props) => {

    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    return(
        <div  className="p-4"> 
            <Card style={{background : theme.b}}>
                <Card.Body>
                <Card.Title className="text-center" style={{fontSize : 32}}>{props.title}</Card.Title>
                    {props.children}
                </Card.Body>
            </Card>
        </div>
    );
}

export default CardBody;