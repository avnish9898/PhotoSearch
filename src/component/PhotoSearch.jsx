import React,{useEffect,useState} from 'react'
import Navbar from './Navbar'
import ImageLoad from './ImageLoad'
export default function PhotoSearch(props) {

    let previewUrl=""
    const url='https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=aeafe065ace713b9cedb10b958dfa6a3&format=json&nojsoncallback=1&api_sig=891c234ff88565ed46c43c3dc792b94a'
    const url2='https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=aeafe065ace713b9cedb10b958dfa6a3&text=Value&format=json&nojsoncallback=1&api_sig=fecd019069cc63aac9ff4d8e58dddf95'

    let [photos,setPhotos]=useState([])
    let [previewPhoto,setPreviewPhoto]=useState(false)
    let [imgLoc,setImgLoc]=useState("")
  let [currText,setCurrText]=useState("")
    useEffect(async ()=>{
       let resp=await fetch(url)
      //  resp.photos.getRecent
       let data=await resp.json();
       let arr=[...data["photos"]["photo"]]
      
        setPhotos(arr)
    },[])
    useEffect( async ()=>{
      if(currText!=""){
      let resp=await fetch(url2)
      //  resp.photos.getRecent
       let data=await resp.json();
      
      let filterPhotos=data["photos"]["photo"].filter((obj)=>{
        return obj["title"].trim().includes(currText)
      })
      filterPhotos.map((obj)=>{
        console.log(obj["title"]);
      })
      if(filterPhotos.length>0){
        
         setPhotos(filterPhotos)
      }
    }
    else{
      let resp=await fetch(url)
      //  resp.photos.getRecent
       let data=await resp.json();
       let arr=[...data["photos"]["photo"]]
      
        setPhotos(arr)
    }
    },[currText])

   const handleCurrText=(e)=>{
     setCurrText(e.target.value)
   }
  
   const previewImage=(e)=>{
      setImgLoc(e.target.src)
      setPreviewPhoto(!previewPhoto)
   }

    return (
    
        <div className="App">
               <Navbar handleCurrText={handleCurrText}></Navbar>
        
          <div className="imgContainer">
            {!previewPhoto?photos.map((movieObj)=>{
                let serverId=movieObj["server"]
                let id=movieObj["id"]
                let secret=movieObj["secret"]
                let url="https://live.staticflickr.com/"+serverId+"/"+id+"_"+secret+".jpg"
                  return(
                    <img onClick={previewImage} id={id} src={url}/>
                  )
              }):<ImageLoad src={imgLoc} previewImage={previewImage}></ImageLoad>
            }
          </div>
      
        </div>
      );
}
