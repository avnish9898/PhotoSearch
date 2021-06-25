import React,{useEffect,useState} from 'react'

export default function ImageLoad(props) {
   
    return (
        <div className=" previewContainer">

            <img onClick={props.previewImage} className="fullImage" src={props.src}></img>
        </div>
    )
}
