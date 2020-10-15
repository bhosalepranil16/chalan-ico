import React, { useState, useContext } from 'react';

import { Form } from 'react-bootstrap';
import { ChalanContext } from '../contexts/ChalanContext';
import SubmitButton from './entity/submitButton';

const Balance = (props) => {

    const [tokens, setTokens] = useState(0);
    const { chalanContract, account, symbol } = useContext(ChalanContext);

    const balanceOf = async(e) => {
        try {
            e.preventDefault();
            const a = await chalanContract.methods.balanceOf(account).call({from : account});
            setTokens(a);
        }
        catch(err) {
            window.alert(err.message);
        }
    }

    return(
        <Form onSubmit={(e) => {balanceOf(e)}}>
            <SubmitButton/>
            <h3 className="text-center">Balance: { tokens } {symbol}</h3>
        </Form>
    );
}

export default Balance;