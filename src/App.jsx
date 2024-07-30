import React from 'react';
import ReactDOM from 'react-dom';
import { BottomNavigationBar } from './components/bottomNavigationBar/BottomNavigationBar.jsx';
import TopNavigationTab from './components/topNavigationTab/TopNavigationTab.jsx';

const App = () => {
  return (
    <div className='container'>
      <TopNavigationTab/>
      <div className="container-view">Some activities should be here</div>
      <BottomNavigationBar/>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
