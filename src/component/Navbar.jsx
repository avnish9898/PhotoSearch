import React,{useEffect,useState} from 'react';
import PhotoSearch from './PhotoSearch';

export default function Navbar(props) {

    const handleCurrText=e=>{
        
            props.handleCurrText(e);        
    }
     return (
    
    <div className="App">
     <nav className=" displayFlex navbar-dark bg-dark">
        <h2 className="text-light ">Search Photos</h2>
        <input class="form-control " onChange={handleCurrText}  type="text" placeholder="Search" aria-label="Search"/>
    </nav>
    </div>
    )
}
