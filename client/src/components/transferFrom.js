import React, { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { ChalanContext } from '../contexts/ChalanContext';
import SubmitButton from './entity/submitButton';
import InputGroup from './entity/InputGroup';

const Balance = (props) => {
    const [tokens, setTokens] = useState(0);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const { chalanContract, account } = useContext(ChalanContext);

    const transferFrom = async(e) => {
        try {
            e.preventDefault();
            await chalanContract.methods.transferFrom(from, to, parseInt(tokens)).send({ from : account });
            setFrom('');
            setTo('');
            setTokens(0);
        }
        catch(err) {
            window.alert(err.message);
        }
    }

    return(
        <Form onSubmit={(e) => {transferFrom(e)}}>
            <InputGroup label="From" type="text" value={from} callback={setFrom} placeholder="From"  />
            <InputGroup label="To" type="text"  value={to} callback={setTo} placeholder="To" />
            <InputGroup label="Tokens" type="number"  value={tokens} callback={setTokens} />
            <SubmitButton/>
        </Form>
    );
}

export default Balance;