import React from 'react';

import ThemeContextProvider from './contexts/ThemeContext';
import ChalanContextProvider from './contexts/ChalanContext';
import Header from './components/header';
import MainContainer from './components/mainContainer';

function App() {

  return (
    <div className="App">
		<ThemeContextProvider>
			<ChalanContextProvider>
				<Header/>
				<MainContainer/>
			</ChalanContextProvider>
		</ThemeContextProvider>
    </div>
  );
}

export default App;
