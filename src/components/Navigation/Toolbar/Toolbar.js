import React from 'react'
import './Toolbar.css'
import NavigationItems from '../NanigationItems/NavigationItems'
const toolbar = (props) => (
    <header className="Toolbar">
        <div>MENU</div>
        <NavigationItems/>
    </header>
);
export default toolbar
