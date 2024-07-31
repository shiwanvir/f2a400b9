import React from 'react';
import ReactDOM from 'react-dom';
import { CallProvider } from './contexts/CallContext.jsx';
import { BottomNavigationBar } from './components/bottomNavigationBar/BottomNavigationBar.jsx';
import TopNavigationTab from './components/topNavigationTab/TopNavigationTab.jsx';

const App = () => {
  return (
    <CallProvider>
    <div className='container'>
      <TopNavigationTab/>
      <BottomNavigationBar/>
    </div>
    </CallProvider>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
