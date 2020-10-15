import React, { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';

import { ChalanContext } from '../contexts/ChalanContext';
import SubmitButton from './entity/submitButton';
import InputGroup from './entity/InputGroup';

const Mint = () => {
    const { web3 ,chalanICOContract, account } = useContext(ChalanContext);
    const [tokens, setTokens] = useState(0);
    const [amount, setAmount] = useState(0);
    
    const buyTokens = async(e) => {
        try {
            e.preventDefault();
            await chalanICOContract.methods.mint(parseInt(tokens))
            .send({from : account, value : web3.utils.toWei(amount.toString(), 'ether')});
            setTokens(0);
            setAmount(0);
        }
        catch(err) {
            window.alert(err.message);
        }
    }

    const callbackToken = (val) => {
        const noOfTokens = parseInt(val);
        setTokens(noOfTokens);
        setAmount(noOfTokens * 0.001);
    }

    const callbackAmount = (val) => {
        const _amount = parseInt(val);
        setAmount(_amount);
        setTokens(_amount * 1000);
    }

    return(
        <>
            <Form onSubmit={(e) => {buyTokens(e)}}>
                <InputGroup label="No. Of Chalan Tokens" type="number" value={tokens} callback={callbackToken} />
                <InputGroup label="Ether" type="number" value={amount} callback={callbackAmount} />
                <SubmitButton/>
            </Form>
        </>
    );
}


export default Mint;