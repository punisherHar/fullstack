import {Link} from "react-router-dom";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useForm } from "react-hook-form"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import axios, {isCancel, AxiosError} from 'axios';

export default function RegisterPage(){
    const { register,
         handleSubmit,
         watch,
         setError,
         formState:{ errors, isSubmitting } } = useForm()

    const onSubmit  = (data) => {

        const response =  axios.post('http://127.0.0.1:8000/api/accounts/create/',{
                 "username":data["username"],
                 "email":data["email"],
                 "password":data["password"],
                 "password2":data["password2"],
                 "profile":{
                    "sex":data["sex"],
                    "age":data["age"],
                    "weight":data["weight"],
                    "height":data["height"],
                    "activity_level":data["activity_level"],
                    "goal":data["goal"]
                 }
        }
        ).then((res)=>{console.log(res)})
        .catch((err)=>{
            if(err.response && err.response.data && err.response.data.username){    
                setError("username",
                    {message:"username already exists"}
        )}})

    }
    

    return(
        <div className=" flex flex-col justify-center  min-h-screen w-full" style={{backgroundImage: "url('/src/assets/jpg/backgroundM.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="w-full flex justify-center">
            <form className="w-full flex flex-col pb-7 max-w-xl ml-5 mr-5 rounded bg-slate-200 mx-auto shadow-xl p-5"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="flex mb-4 justify-center align-middle gap-3">
                    <h4 className="font-bold text-3xl text-gray-900 ">Welcome</h4>
                    <AppRegistrationIcon
                        fontSize="large"
                    />
                </div>
                <div className="flex gap-6 mb-4">
                    <div className="w-full">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                        <input {...register("username",{
                                required:"Username is required",
                                minLength:{value:6,message:"Username must have at least 6 characters"},
                                
                        })}
                        type="text" name="username" 
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Alex Scofield"/>      
                        {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input {...register("email",{
                            required:"Email is required",
                            pattern:{value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message:"Invalide Email"}
                        })} type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com"/>
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}              
                    </div>
                    
                </div>
                <div className="flex gap-6 mb-4">
                    <div className="w-full">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input {...register("password",{
                            required:"Password is reuiqred",
                            minLength:{value:8,
                                message:"Password must have at least 8 characters"}
                        })} type="password" name="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>
                    <div className="w-full">
                        <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                        <input {...register("password2",{
                            required:"Confirm your password",
                            validate: value => value === watch("password") || "Passwords do not match"
                        })} type="password" name="password2" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                        {errors.password2 && <span className="text-red-500">{errors.password2.message}</span>}
                    </div>
                    
                </div>
                <div className="pt-5 pb-2">
                    <h1 className="font-bold text-xl">Setting your track <LocalDiningIcon></LocalDiningIcon> </h1>
                </div>
                <div className="flex gap-6 mb-4">
                    <div className="w-full">
                        <label htmlFor="sex" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your sex</label>
                        <select {...register("sex",{
                            required:"Sex is required"
                        })} name="sex" id="=sex" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                            <option value="M">Male &#9794;</option>
                            <option value="F">Female &#9792;</option>
                        </select>
                        {errors.sex && <span className="text-red-500">{errors.sex.message}</span>} 

                    </div>
                    <div className="w-full">
                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your age</label>
                        <input {...register("age",{required:"Age is required"})} placeholder="26" type="number"   name="age" id="age" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
                        {errors.age && <span className="text-red-500">{errors.age.message}</span>} 
                    </div>
                    
                </div>
                <div className="flex gap-6 mb-4">
                    <div className="w-full">
                        <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your weight (kg)</label>
                        <input {...register("weight",{required:"Weight is required"})} placeholder="75" type="number" name="weight" min={0} id="weight" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
                        {errors.weight && <span className="text-red-500">{errors.weight.message}</span>} 
                    </div>
                    <div className="w-full">
                        <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your height (cm)</label>
                        <input {...register("height",{required:"Height is required"})} placeholder="183" type="number" name="height" min={0} id="height" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
                        {errors.height && <span className="text-red-500">{errors.height.message}</span>} 
                    </div>
                    
                </div>
                <div className="flex gap-6 mb-4">
                    <div className="w-full">
                        <label htmlFor="activity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your activity level</label>
                        <select {...register("activity_level",{required:"Activity level is required"})} name="activity" id="activity" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                            <option value="S">Little/no exercise</option>
                            <option value="LA">Light exercis</option>
                            <option value="MA">Moderate exercise (3-5 days/wk)</option>
                            <option value="VA">Very active (6-7 days/wk)</option>
                            <option value="EA">Extra active (very active & physical job)</option>
                        </select>
                        {errors.activity && <span className="text-red-500">{errors.activity.message}</span>} 
                    </div>
                    <div className="w-full">
                        <label htmlFor="goal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your goal</label>
                        <select {...register("goal",{required:"Goal is required"})} name="goal" id="goal" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                            <option value="M">Maintain your weight</option>
                            <option value="LS">Lose weight slow (0.5kg/w)</option>
                            <option value="LF">lose weight fast(1kg/w)</option>
                            <option value="GS">Gain weight slow (0.25kg/w)</option>
                            <option value="GS">Gain weight fast (0.5kg/w)</option>
                        </select>
                        {errors.goal && <span className="text-red-500">{errors.goal.message}</span>} 
                    </div>
                    
                </div>
                <div className="mt-3 flex justify-between items-center">
                    {/* <Link to="/goals"><button type="submit" className="text-white bg-slate-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button></Link> */}
                    <button disabled={isSubmitting}  type="submit" className="text-white bg-slate-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {isSubmitting ? 'Loading' : 'Register'}
                    </button>
                    <Link className="text-slate-900 hover:text-white" to="/login">Already have an account?</Link>
                </div>
            </form>

        </div>
        </div>
    )
}