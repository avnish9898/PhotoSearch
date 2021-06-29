import React,{useEffect,useState} from 'react';
import PhotoSearch from './PhotoSearch';

export default function Navbar(props) {

    const handleCurrText=e=>{
            console.log(props.suggestion);
            props.handleCurrText(e);        
    }
     return (
        
      <nav className=" displayFlex navbar-dark bg-dark">
        <h2 className="text-light ">Search Photos</h2>
        <input  class="form-control " value={props.currText} onChange={handleCurrText}  type="text" placeholder="Search" aria-label="Search"/>
        {props.suggestion!=""?<span>{props.suggestion}</span>:<span> </span>}
    </nav>
    )
}
