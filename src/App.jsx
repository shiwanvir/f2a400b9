import React from 'react';
import ReactDOM from 'react-dom';
import { BottomNavigationBar } from './components/bottomNavigationBar/BottomNavigationBar.jsx';
import TopNavigationTab from './components/topNavigationTab/TopNavigationTab.jsx';

const App = () => {
  return (
    <div className='container'>
      <TopNavigationTab/>
      <BottomNavigationBar/>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
