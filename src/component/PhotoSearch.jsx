import React,{useEffect,useState} from 'react'
import Navbar from './Navbar'
import ImageLoad from './ImageLoad'
export default function PhotoSearch(props) {

    const url='https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=3737be8cb5f107dcfe786aaa389fc889&format=json&nojsoncallback=1'
    let [photos,setPhotos]=useState([])
    let suggestion=""
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
      const url2='https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3737be8cb5f107dcfe786aaa389fc889&tags='+currText+'&format=json&nojsoncallback=1'
      localStorage.setItem('Suggestions',currText)

      let filterPhotos=[]
      if(currText==""){
        let resp=await fetch(url)
        //  resp.photos.getRecent
         let data=await resp.json();
         filterPhotos=[...data["photos"]["photo"]]
         
      }
      
      else{
       let resp=await fetch(url2)
      //  resp.photos.getRecent
       let data=await resp.json();
       filterPhotos=[...data["photos"]["photo"]]

    }
    console.log(url2,currText);

    setPhotos(filterPhotos)
    },[currText])

   const handleCurrText=(e)=>{
    suggestion=localStorage.getItem("Suggestions") 
    alert(suggestion)

    setCurrText(e.target.value)
   }
  
   const previewImage=(e)=>{
      setImgLoc(e.target.src)
      setPreviewPhoto(!previewPhoto)
   }
  
    return (
        
        <>  
          
          <Navbar suggestion={suggestion} currText={currText} handleCurrText={handleCurrText}></Navbar>
        
          <div className="imgContainer" >
            {!previewPhoto?photos.map((movieObj)=>{
                let serverId=movieObj["server"]
                let id=movieObj["id"]
                let secret=movieObj["secret"]
                let url="https://live.staticflickr.com/"+serverId+"/"+id+"_"+secret+".jpg"
                  return(
                    <img  onClick={previewImage} id={id} src={url}/>
                  )
              }):<ImageLoad src={imgLoc} previewImage={previewImage}></ImageLoad>
            }
          </div>
      
        </>
      );
}
