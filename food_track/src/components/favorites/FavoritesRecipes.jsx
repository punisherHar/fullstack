// display favorite recipes
import NavBar from '../navbar/Navbar'
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from 'react-responsive';
import Recipe from '../recipes/Recipe'
import { useContext, useState } from 'react';
import RecipeContext from '@/context/RecipesContext';
import { TrackProvider } from '@/context/TrackContext';
import ProfileContext from '@/context/ProfileContext';

export default function FavoriteRecipes(){

    const [activeRecipeId,setActiveRecipeId] = useState(null)
    const {data} = useContext(ProfileContext || null)
    let recipes = []

    if(data){
        recipes = data.favorite_recipes
    }
        

    return(
        <>  
            <NavBar/>
            <TrackProvider>
                <div className='bg-gray-300 flex flex-col lg:gap-5 gap-5 pt-5 justify-center items-center pb-5'>
                {recipes && recipes.map((recipe, index) => (
                    <Recipe key={index} label={recipe.label} 
                    calories={recipe.calories} proteins={recipe.proteins} 
                    fats={recipe.fats} carbs={recipe.carbs}
                    weight={recipe.weight}
                    isFavorite={true}
                    />
                ))}

                </div>
            </TrackProvider>
        </>
    )
}

// {'label': 'egg', 'calories': '63', 'proteins': '12', 'fats': '5', 'carbs': '0', 'weight': '50'}
// {'weight': '50', 'label': 'Hard Boiled Egg', 'protein': '12.6', 'carbs': '1.1', 'calories': '155', 'fats': '10.6'}
// {'weight': '50', 'label': 'Hard Boiled Egg', 'proteins': '12.6', 'carbs': '1.1', 'calories': '155', 'fats': '10.6'}