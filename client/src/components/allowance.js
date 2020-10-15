import React, { useState, useContext } from 'react';

import { Form } from 'react-bootstrap';
import { ChalanContext } from '../contexts/ChalanContext';
import SubmitButton from './entity/submitButton';
import InputGroup from './entity/InputGroup';

const Allowance = (props) => {
    const [spender, setSpender] = useState(''); 
    const [tokens, setTokens] = useState(0);
    const { chalanContract, account, symbol } = useContext(ChalanContext);

    const allowance = async(e) => {
        try {
            e.preventDefault();
            const a = await chalanContract.methods.allowance(account, spender).call({from : account});
            setTokens(a);
        }
        catch(err) {
            window.alert(err.message);
        }
    }

    return(
        <Form onSubmit={(e) => {allowance(e)}}>
            <InputGroup label="Spender" value={spender} callback={setSpender} placeholder="Spender" />
            <SubmitButton />
            <h3 className="text-center">Allowance: { tokens } {symbol}</h3>
        </Form>
    );
}

export default Allowance;