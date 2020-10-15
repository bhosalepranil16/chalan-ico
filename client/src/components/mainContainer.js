import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { ThemeContext } from '../contexts/ThemeContext';
import CardBody from './cardBody';
import Transfer from './transfer';
import Approve from './approve';
import TransferFrom from './transferFrom';
import Mint from './mint';
import Balance from './balance';
import Allowance from './allowance';

const MainContainer = (props) => {

    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    return (
        <div style={{background : theme.a, color : theme.d}}>
        <Container>
            <Switch>
                <Route path="/transaction">
                    <CardBody title="Transfer">
                        <Transfer />
                    </CardBody>
                    <CardBody title="Approve">
                        <Approve />
                    </CardBody>
                    <CardBody title="Transfer From">
                        <TransferFrom />
                    </CardBody>
                </Route>
                <Route path="/">
                    <CardBody title="Mint">
                        <Mint />
                    </CardBody>
                    <CardBody title="Balance">
                        <Balance />
                    </CardBody>
                    <CardBody title="Allowance">
                        <Allowance />
                    </CardBody>
                </Route>
            </Switch>
        </Container>
        </div>
    );
}

export default MainContainer;