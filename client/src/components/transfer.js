import React, { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { ChalanContext } from '../contexts/ChalanContext';
import SubmitButton from './entity/submitButton';
import InputGroup from './entity/InputGroup';

const Transfer = (props) => {
    const [tokens, setTokens] = useState(0);
    const [to, setTo] = useState('');
    const { chalanContract, account } = useContext(ChalanContext);

    const transfer = async(e) => {
        try {
            e.preventDefault();
            await chalanContract.methods.transfer(to,parseInt(tokens)).send({from : account});
            setTo('');
            setTokens(0);
        }
        catch(err) {
            window.alert(err.message);
        }
    }

    return(
        <Form onSubmit={(e) => {transfer(e)}}>
            <InputGroup  label="No. Of Chalan Tokens" type="number" value={tokens} callback={setTokens}/>
            <InputGroup  label="To" type="text" value={to} callback={setTo} placeholder="To"/>
            <SubmitButton/>
        </Form>
    );
}

export default Transfer;