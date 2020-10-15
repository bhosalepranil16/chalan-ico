import React, { Component, createContext } from 'react';
import Web3 from 'web3';

import Chalan from '../abis/Chalan.json';
import ChalanICO from '../abis/ChalanICO.json';

export const ChalanContext = createContext();

class ChalanContextProvider extends Component {
    state = {
        web3 : null,
        account : '',
        chalanContract : null,
        chalanICOContract : null,
        name : '',
        symbol : '',
        chalanPrice : 0,
        chalanSold : 0
    }

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
        await this.loadChalanDetails();
        window.ethereum.on('accountsChanged',(accounts) => {
            if (accounts.length === 0) {
              console.log('Please connect to MetaMask.');
            } else if (accounts[0] !== this.props.account) {
              this.setState({account : accounts[0]});
            }
        });
    }

    async loadWeb3() {
        try {
            if(window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
            }
            if(window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
            }
            else {
                const provider =  new Web3.providers.HttpProvider("http://127.0.0.1:7545");
                // const provider =  new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/5fc186d7b8d24f83833659abf2b8c439");
                window.web3 = new Web3(provider);
            }
            this.setState({web3 : window.web3});
        }
        catch(err) {
            window.alert(err.message);
        }
    }

    async loadBlockchainData() {
        try {
            const accounts = await this.state.web3.eth.getAccounts();
            this.setState({account : accounts[0]});
            const networkId = await this.state.web3.eth.net.getId();
            const chalanNetworkData = Chalan.networks[networkId];
            const chalanICONetworkData = ChalanICO.networks[networkId];
            if(chalanNetworkData) {
                const abi = Chalan.abi;
                const address = chalanNetworkData.address;
                const contract = await new this.state.web3.eth.Contract(abi,address);
                this.setState({chalanContract : contract});
            }
            if(chalanICONetworkData) {
                const abi = ChalanICO.abi;
                const address = chalanICONetworkData.address;
                const contract = await new this.state.web3.eth.Contract(abi,address);
                this.setState({chalanICOContract : contract});
            }
        }
        catch(err) {
            window.alert(err.message);
        }
    }

    async loadChalanDetails() {
        try {
            let temp = await this.state.chalanContract.methods.name().call({from : this.state.account});
            this.setState({name : temp});
            temp = await this.state.chalanContract.methods.symbol().call({from : this.state.account});
            this.setState({symbol : temp});
            temp = await this.state.chalanICOContract.methods.chalanPrice().call({from : this.state.account});
            this.setState({ chalanPrice : temp });
            temp = await this.state.chalanICOContract.methods.chalanSold().call({from : this.state.account});
            this.setState({ chalanSold : temp });
        }
        catch(err) {
            window.alert(err.message);
        }
    }

    render() {
        return(
            <ChalanContext.Provider value={{...this.state }}>
                {this.props.children}
            </ChalanContext.Provider>
        );
    }
}

export default ChalanContextProvider;


