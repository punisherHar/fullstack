
import { createContext, useState, useEffect, useContext } from "react";
import axios, {isCancel, AxiosError} from 'axios';
import AuthContext from "./AuthContext";
import { redirectDocument,useNavigate } from "react-router-dom";



const TrackContext = createContext()


export default TrackContext;


export const TrackProvider = ({children}) =>{

    const currentDate = new Date();
    const currentDay = currentDate.getDate()

    let [data, setdata] = useState(null)
    let [id,setId] = useState(()=>localStorage.getItem('trackId') ? JSON.parse(localStorage.getItem('trackId')) : null)
    let [loading,setLoading] = useState(true)
    let [newDay,setNewDay] = useState(()=>localStorage.getItem('day') ? (localStorage.getItem('day') == currentDay ? false : true) : true)
    const {tokens,logoutUser} = useContext(AuthContext)
    const navigate = useNavigate()
    
      
        
    let updateTrackId = async ()=>{
        if(tokens && tokens!=undefined){
            try {
                const config = {
                  headers: { Authorization: `Bearer ${tokens.access}` }
                }
    
                let response = await axios.get(`http://localhost:8000/api/tracks/id/`, config);
                if(response.status === 200){
                    localStorage.setItem('trackId',JSON.parse(response.data.trackId))
                   
                    setId(response.data.trackId)
                };
            }catch(err){
                navigate("/login")
            }
        }
        
    }
    
    let resetTrack = async ()=>{
        if(tokens && tokens!=undefined){
            if(newDay===true){
                const url = "http://localhost:8000/api/tracks/refresh/"
                const config = {
                    headers : {Authorization: `Bearer ${tokens.access}` },
                }
                const response = await axios.post(url,{},config)
                if(response.status===200){
                    localStorage.setItem('day',JSON.stringify(currentDay))
                    setNewDay(false)
                }else{
                    logoutUser()
                }
                
            }
        }

    }

    let updateTrack = async (id)=>{
        try{
            const url = `http://localhost:8000/api/tracks/details/${id}/`
            const config = {
                headers: { Authorization: `Bearer ${tokens.access}` },
                params: {id:id}
            };

            let response = await axios.get(url,config);
            if(response.status===200){
                setdata(response.data)
                setLoading(false)
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        if(tokens){
            if(loading){
                updateTrackId(tokens.acess)
            }else if (id) {
                updateTrack(id);
            }
    
        }
    },[tokens,loading])

    useEffect(()=>{
        if(tokens&&id){
            updateTrack(id)
        }
    },[id,loading])

    useEffect(()=>{
        if(tokens){
            resetTrack()
        }   
    },[tokens])

    let contextData = {
        data:data,
        updateTrack:updateTrack,
        updateTrackId:updateTrack,
        id:id
    }
    return(
        <TrackContext.Provider value={contextData} >
            {loading?null:children}
        </TrackContext.Provider>
    )
}