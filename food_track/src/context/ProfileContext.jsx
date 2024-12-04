import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
import AuthContext from "./AuthContext";
import PropTypes from 'prop-types';



const ProfileContext = createContext()

export default ProfileContext;

ProfileProvider.propTypes = {
    children: PropTypes.node,
};
export const ProfileProvider  = (({children})=>{
    
    const {tokens,logoutUser} = useContext(AuthContext || null)
    const [profileId,setProfileId] = useState(null)
    const [profileData,setProfileData] = useState(null)
    const [profileHistory,setProfileHistory] = useState(null)

    // get the profile pk 
    let updateProfileId = async()=>{
        if(tokens && tokens != undefined){
            try{
                const config = {
                    headers: { Authorization: `Bearer ${tokens.access}` }
                }
                let response = await axios.get('http://localhost:8000/api/accounts/profile/id/',config)
                if(response.status===200){
                    const data = response.data["profileId"]
                    if(data){
                        setProfileId(data)
                    }
                    
                }
            }
            catch(err){
                logoutUser()
            }
        }
    }

    // get profile data 
    let updateProfileData = async()=>{
        if(tokens && profileId){
            try{
                const config = {
                    headers : { Authorization : `Bearer ${tokens.access}`},
                }
                let response = await axios.get(`http://localhost:8000/api/accounts/profile/details/${profileId}/`,config)
                let response2 = await axios.get("http://localhost:8000/api/accounts/profile/history/",config)
                if(response.status === 200 && response2.status == 200){
                    const data = response.data
                    const history = response2.data
                    if(data){
                        setProfileData(data)
                        
                    }
                    if(history){
                        setProfileHistory(history)
                    }

                    
                }
            }
            catch(err){
                logoutUser()
            }
        }
    }

    useEffect(()=>{
        updateProfileId()
    },[tokens])
    useEffect(()=>{
        updateProfileData()
    },[profileId])
    // put the methods to add and remove favorite
    //////////////////////////////////////////////

    const addToFavorites = async(recipe)=>{
        if(tokens?.access && tokens != undefined){
            const config = {
                headers : { Authorization : `Bearer ${tokens.access}` },
            }
            try{
                console.log(recipe.weight)
                let response = await axios.post("http://localhost:8000/api/recipes/add/",recipe,config)
                if(response.status === 200){
                    console.log(response)
                    updateProfileData()
                    
                }
            }catch(err){
                console.log(err)
            }

        }
    }

    const removeFromFavorites = async(recipe)=>{
        if(tokens?.access && tokens != undefined){
            const config = {
                headers : { Authorization : `Bearer ${tokens.access}`},
            }
            try{
                let response = await axios.post("http://localhost:8000/api/recipes/remove/",recipe,config)
                if(response.status === 200){
                    console.log(response)
                    updateProfileData()
                    
                }
            }catch(err){
                console.log(err)
            }
        }
    }

    
    const contextData={
        data:profileData,
        history:profileHistory,
        removeFromFavorites:removeFromFavorites,
        addToFavorites:addToFavorites
    }
    return(
        <ProfileContext.Provider value={contextData}>
            {children}
        </ProfileContext.Provider>
    )
})
