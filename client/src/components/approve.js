import React, { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';

import { ChalanContext } from '../contexts/ChalanContext';
import SubmitButton from './entity/submitButton';
import InputGroup from './entity/InputGroup';

const Approve = (props) => {
    const [tokens, setTokens] = useState(0);
    const [spender, setSpender] = useState('');
    const { chalanContract, account } = useContext(ChalanContext);

    const approve = async(e) => {
        try {
            e.preventDefault();
            await chalanContract.methods.approve(spender,parseInt(tokens)).send({from : account});
            setSpender('');
            setTokens(0);
        }
        catch(err) {
            window.alert(err.message);
        }
    }
    return(
        <Form onSubmit={(e) => {approve(e)}}>
            <InputGroup label="Spender" type="text" value={spender} callback={setSpender} placeholder="Spender"  />
            <InputGroup label="No. Of Chalan Tokens" type="number" value={tokens} callback={setTokens} />
            <SubmitButton/>
        </Form>
    );
}

export default Approve;