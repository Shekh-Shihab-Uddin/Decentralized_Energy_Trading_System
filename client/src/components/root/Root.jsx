import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../navigation/Navigation.jsx';

const Root = ({account}) => {
  return (
    <div>
      <Navigation account={account}/>
      <Outlet/>
    </div>
  )
}

export default Root