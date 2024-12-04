import { createContext, useState, useEffect, useContext } from "react";
import axios, {isCancel, AxiosError} from 'axios';
import { Navigate, useNavigate } from "react-router";
import LoginPage from "../components/login/LoginPage"


const AuthContext = createContext()


export default AuthContext;


export const AuthProvider = ({children}) =>{
    
    let [tokens, setToken] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true)
    let [userId,setUserId] = useState(()=>localStorage.getItem('userId') ? JSON.parse(localStorage.getItem('userID')) : null)
    let navigate = useNavigate()

    let loginUser = async (username,password)=> {
        try{
            let response = await axios.post("http://localhost:8000/api/accounts/token/",{
                username:username,
                password:password
            })
            let data = await response.data
            setToken(data)
            localStorage.setItem('authTokens',JSON.stringify(data))
            return null
        }
        catch(err){
            console.log(err)
            return(err)
        }
    }
    let updateUserId = async (accessToken) => {
        if(tokens && tokens!= undefined){
            try {
            const config = {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        

            let response = await axios.get('http://localhost:8000/api/accounts/id/', config)
            let id = response.data.id
            setUserId(id)
            localStorage.setItem('userId', JSON.stringify(id))
            
            } catch (err) {
            console.log(err)
            }
        }
    }
    let logoutUser = async() => {
        if(tokens && tokens.refresh && tokens != undefined){
            const url = "http://localhost:8000/api/accounts/logout/blacklist/"
            const config = {
                headers: { Authorization: `Bearer ${tokens.access}` }
            }
            try{
                const response = await axios.post(url,{"refresh_token":tokens.refresh},config)
                if(response.status==200){
                setToken(null)
                }
            }
            catch(err){
                console.log(err)
            }
        }  
        if(localStorage.getItem('authTokens')){localStorage.removeItem('authTokens')}
    }

    let updateToken = async ()=>{
        if(tokens && tokens.refresh && tokens!=undefined){
            try{
                let response = await axios.post("http://localhost:8000/api/accounts/token/refresh/",{
                    refresh:tokens.refresh
                })
                let data = await response.data
                setToken(data)
                localStorage.setItem('authTokens',JSON.stringify(data))
                setLoading(false)
            }catch(err){
                console.log(err)
                // if(err.response.data["detail"]==="Token is blacklisted"){
                //     logoutUser()
                //     navigate("/login")
                // }
            }
        }
        
        
    }

    let contextData = {
        tokens : tokens,
        userId : userId,
        loginUser:loginUser,
        logoutUser:logoutUser
       
    }

    useEffect(()=>{
        if(loading){
            updateToken()
        }

        let intervalId = setInterval(()=>{
            if(tokens){
                updateToken()
            }
        },240000)
        return ()=> clearInterval(intervalId)

    },[tokens,loading])
    useEffect(()=>{
        if(tokens){
             updateUserId(tokens.access)
            }
    },[tokens])

    return(
        <AuthContext.Provider value={contextData}  >
            {children}
        </AuthContext.Provider>
    )
}