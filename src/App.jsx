import React from 'react';
import ReactDOM from 'react-dom';
import { CallProvider } from './contexts/CallContext.jsx';
import { BottomNavigationBar } from './components/bottomNavigationBar/BottomNavigationBar.jsx';
import TopNavigationTab from './components/topNavigationTab/TopNavigationTab.jsx';

const App = () => {
  return (
    <CallProvider>
      <div style={{ display: 'grid', height: '100vh' }}>
        <div style={{ overflowY: 'auto', gridRow: 1 }}>
          <TopNavigationTab />
        </div>
        <div style={{ gridRow: 9, marginBottom: '10px' }}>
          <BottomNavigationBar />
        </div>
      </div>
    </CallProvider>
  );
};


ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
