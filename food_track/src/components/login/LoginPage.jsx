
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { useForm } from "react-hook-form"
import {Link} from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "@/context/AuthContext";
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import axios, {isCancel, AxiosError} from 'axios';


export default function Login(){
    let {loginUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const { register,
        handleSubmit,
        watch,
        setError,
        formState:{ errors, isSubmitting } } = useForm()


    const onSubmit  = (data) => {
        loginUser(data["username"],data["password"]).then(
            error=>{if(error){
                setError('root',{
                    message:"You have entered an invalid username or password"
                }
            )
            }
            else{
                navigate("/")
            }
        }
        )  
    }

    return(
        <div className=" flex flex-col justify-center bg-cover min-h-screen w-full" style={{backgroundImage: "url('/src/assets/jpg/backgroundM.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>

        <div className="w-full flex justify-center">
            
            <form className="w-full flex flex-col pb-7 max-w-xl ml-5 mr-5 rounded bg-slate-200 mx-auto shadow-xl p-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex mb-4 justify-center align-middle gap-3">
                <h4 className="font-bold text-3xl text-gray-900 ">Login</h4>
                <AccountBoxIcon
                    fontSize="large"
                />
                </div>
                <div className="mb-5">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                    <input type="text" id="username" 
                        {...register("username",{
                            required:"Username is required",
                            minLength:{value:6,message:"Username must have at least 6 characters"},
                            
                        })}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Alex Scofield" 
                    />
                    {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" id="password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  
                        {...register("password",{
                            required:"Password is reuiqred",
                        })}
                    />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </div>
                {errors.root && <span className="text-red-500">{errors.root.message}</span>}
                <div className="mt-3 flex justify-between items-center">
                <button disabled={isSubmitting}  type="submit" className="text-white bg-slate-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {isSubmitting ? 'Loading' : 'Login'}
                </button>
                <Link to="/register"><button className="text-white bg-slate-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">create new account</button></Link>    
                </div>
            </form>
        </div>
        </div>
    )
}