import { createContext, useState, useEffect, useContext } from "react";
import axios, {isCancel, AxiosError} from 'axios';
import AuthContext from "./AuthContext";

const RecipeContext = createContext()

export default RecipeContext;

export const RecipeProvider = (({children})=>{
    const {tokens,logoutUser} = useContext(AuthContext)
    let [searchData,setSearchData] = useState()

    let searchForRecipes = async(ing)=>{
        try{
            const url = `http://localhost:8000/api/tracks/search/`
            const config = {
                headers: { Authorization: `Bearer ${tokens.access}` },
                params:{ing: ing}}
            let response = await axios.get(url,config);
            setSearchData(response.data)
        }catch(err){
            logoutUser()
        }

    }
    let contextData = {
        searchData:searchData,
        setSearchData:setSearchData,
        searchForRecipes:searchForRecipes
    }

    return(
        <RecipeContext.Provider value={contextData}>
            {children}
        </RecipeContext.Provider>
    )
})