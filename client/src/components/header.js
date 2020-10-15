import React, { useContext } from 'react';
import { Navbar, Nav, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Logo from '../assessts/Logo.png'
import { ChalanContext } from '../contexts/ChalanContext';
import { ThemeContext } from '../contexts/ThemeContext';

const Header = (props) => {

    const { account, chalanICOContract, symbol } = useContext(ChalanContext);
    const { isLightTheme, light, dark, toggleTheme } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;

    const endSale = async () => {
        try {
            await chalanICOContract.methods.endSale().send({ from : account });
        }
        catch(err) {
            window.alert(err.message);
        }
    }

    return(
        <>
            <Navbar expand="lg" style={{background: theme.c, color: theme.d}}>
                <Navbar.Brand href="/">
                    <span className="p-5">
                        <Image className="float-left" src={Logo} rounded style={{height : 80}} />
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="px-3" to="/" style={{color: theme.d}}><h5>Home</h5></Link>
                        <Link className="px-3"  to="/transaction" style={{color : theme.d}}><h5>Transaction</h5></Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className=" p-3 text-center" style={{background: theme.b, color : theme.d}}>
                <span>
                    <Image className="d-inline" src={Logo} rounded style={{height : 80}} />
                    <h3 className="d-inline">Chalan ({ symbol }) ICO</h3>
                </span>
                    
                <p>{account}</p>
                <Button className="d-block mx-auto my-3" onClick={toggleTheme}>Toggle Theme</Button>
                <Button onClick={(e) => {endSale()}} >End Sale</Button>
                <h3 className="p-2">1 {symbol} = 0.001 ETH</h3>
            </div>
        </>
    );
}

export default Header;