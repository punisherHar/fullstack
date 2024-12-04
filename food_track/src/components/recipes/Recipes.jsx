
import NavBar from '../navbar/Navbar'
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from 'react-responsive';
import Recipe from './Recipe.jsx'
import { useContext, useState } from 'react';
import RecipeContext from '@/context/RecipesContext';
import { TrackProvider } from '@/context/TrackContext';
import { UserX } from 'lucide-react';
import ProfileContext from '@/context/ProfileContext';



export default function Recipes(){
    const smallScreens = useMediaQuery({ maxWidth: 	768 })
    const {searchData} = useContext(RecipeContext)
    const {data} = useContext(ProfileContext)
    const recipes = searchData
    let labels = []
    let favoriteRecipes = []
    if(data){
        favoriteRecipes = data.favorite_recipes
        labels = favoriteRecipes.map((recipe)=> recipe.label)
    }

// check if recipe exist
    return(
        <>  
            <NavBar/>
            <TrackProvider>

                <div className='bg-gray-300 flex flex-col lg:gap-5 gap-5 pt-5 justify-center items-center pb-5'>
                {recipes && recipes.map((food, index) => (
                    <Recipe key={index} label={food.label} 
                    calories={(food.calories).toFixed(0)} proteins={(food.proteins).toFixed(1)} 
                    fats={(food.fats).toFixed(1)} carbs={(food.carbs).toFixed(1)}
                    weight={(food.weight).toFixed(0)} isFavorite={labels.includes(food.label)}

                    
                    />
                ))}

                </div>
            </TrackProvider>
        </>
    )
}