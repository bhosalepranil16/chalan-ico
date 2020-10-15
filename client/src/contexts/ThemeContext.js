import React, { createContext, Component } from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
    state = {
        isLightTheme : true,
        light : {
            a : '#FAFAFA',
            b : '#F6F6F6',
            c : '#DEDEDE',
            d : '#2C2C2D'
        },
        dark : {
            a : '#535353',
            b : '#3A3A3A',
            c : '#141414',
            d : '#FAFAFA'
        }
    }

    toggleTheme = () => {
        this.setState((prevState) => ({
            isLightTheme : !prevState.isLightTheme
        }));
    }

    render() {
        return(
            <ThemeContext.Provider value={{...this.state, toggleTheme : this.toggleTheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export default ThemeContextProvider;