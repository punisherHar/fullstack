import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressBar from "@ramonak/react-progress-bar";
import { useMediaQuery } from 'react-responsive';
import { useContext, useEffect } from 'react';
import TrackContext from '@/context/TrackContext';
import AuthContext from '@/context/AuthContext';


export default function CaloriesTrack(){
    let {data} = useContext(TrackContext)

    const isLessThanLarge = useMediaQuery({ maxWidth: 1024 });
    const calVal = data.calories_today
    const calGoal=data.calories_goal
    const proteinVal = data.protein_today
    const proteinGoal = data.protein_goal
    const fatsVal = data.fats_today
    const fatsGoal = data.fats_goal
    const carbsVal = data.carbs_today
    const carbsGoal = data.carbs_goal
    let remainingCal = Math.max(0,(calGoal-calVal).toFixed(0))
    let remainingProtein = Math.max(0,(proteinGoal-proteinVal).toFixed(1))
    let remainingCarbs = Math.max(0,(carbsGoal-carbsVal).toFixed(1))
    let remainingFats = Math.max(0,(fatsGoal-fatsVal).toFixed(1))


    return(

        <div className='bg-gray-300 h-full'>  
            {isLessThanLarge ? (
            <>  
                <div className="flex justify-center pt-10">
                <div className="shadow-md w-100 h-110 flex flex-col gap-5 justify-center items-center mb-5 bg-white">
                    <h1 className="font-bold text-lg text-slate-900">Calories(kcal)</h1>
                    <div className='w-50 h-50' style={{ width: '80%', height: '80%' }}>
                        <CircularProgressbar minValue={0} 
                            maxValue={calGoal} 
                            value={calVal} 
                            text={`${calVal}/${calGoal}`}
                            styles={buildStyles({                        
                                textSize: '1rem',
                                pathTransitionDuration: 0.5,
                                pathColor: 'rgb(15 23 42)',
                                textColor: 'rgb(15 23 42)',
                                trailColor: 'rgba(15,23,42,0.25)',
                                backgroundColor: '#3e98c7',
                            })}
                            >
                        </CircularProgressbar>
                    
                    </div>
                    <h3 className='text-lg text-slate-800 pb-4 font-normal'><b>Remaining:</b> {remainingCal}Kcal</h3>
                    
                </div>
                </div>
                <div className='bg-gray-300 flex flex-col gap-5 pb-4'>
                    <div className='w-full lg:flex-grow  shadow-md h-36  flex items-center p-3 relative bg-white'>
                    <div className='relative w-24'>
                        <h1 className='font-bold text-slate-800 text-lg'>Proteins (Grams)</h1>
                        <p className='absolute top-10 left-20'><b>remaining:</b>{remainingProtein}g</p>
                    </div>
                    <ProgressBar className='w-full'
                    completed={proteinVal}
                    maxCompleted={proteinGoal}
                    customLabel=" "
                    bgColor='linear-gradient(to right,#922822,#E5554E)'                
                    />
                    <div className='absolute bottom-10 right-5' >
                        <p className='text-slate-800S'><span className='font-bold'>{proteinVal}</span>/{proteinGoal}g</p>
                    </div>
                    </div> 

                    <div className='w-full lg:flex-grow  shadow-md h-36  flex items-center p-3 relative bg-white'>
                    <div className='relative w-24'>
                        <h1 className='font-bold text-slate-800 text-lg'>Fats (Grams)</h1>
                        <p className='absolute top-10 left-20'><b>remaining:</b>{remainingFats}g</p>
                    </div>
                    
                    <ProgressBar className='w-full'
                    completed={fatsVal}
                    maxCompleted={fatsGoal}
                    customLabel=" "
                    bgColor='linear-gradient(to right,#FF8C00,#FFD580)'               
                    />
                    <div className='absolute bottom-10 right-5' >
                        <p className='text-slate-800S'><span className='font-bold'>{fatsVal}</span>/{fatsGoal}g</p>
                    </div>
                    
                    </div> 
                    
                    <div className='w-full lg:flex-grow  shadow-md h-36  flex items-center p-3 relative bg-white'>
                    <div className='relative w-24'>
                        <h1 className='font-bold text-slate-800 text-lg'>Carbs (Grams)</h1>
                        <p className='absolute top-10 left-20'><b>remaining:</b>{remainingCarbs}g</p>
                    </div>
                    <ProgressBar className='w-full'
                    completed={carbsVal}
                    maxCompleted={carbsGoal}
                    customLabel=" "
                    bgColor='linear-gradient(to right,#1B4D3E,#17B169)'                
                    />
                    <div className='absolute bottom-10 right-5' >
                        <p className='text-slate-800S'><span className='font-bold'>{carbsVal}</span>/{carbsGoal}g</p>
                    </div>
                    </div> 
                </div>   
            </>
            )
            :<>
            <div className="flex justify-center pt-10">
                <div className="shadow-md w-80 h-80 flex flex-col gap-5 justify-center items-center bg-white">
                    <h1 className="font-bold text-lg text-slate-900">Calories(kcal)</h1>
                    <div className='w-50 h-50' style={{ width: '80%', height: '80%' }}>
                        <CircularProgressbar minValue={0} 
                            maxValue={calGoal} 
                            value={calVal} 
                            text={`${calVal}/${calGoal}`}
                            styles={buildStyles({                        
                                textSize: '1rem',
                                pathTransitionDuration: 0.5,
                                pathColor: 'rgb(15 23 42)',
                                textColor: 'rgb(15 23 42)',
                                trailColor: 'rgba(15,23,42,0.25)',
                                backgroundColor: '#3e98c7',
                            })}
                            >
                        </CircularProgressbar>
                    </div>
                    
                </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-5 items-center pt-8 justify-around pl-8 pr-8'>
                <div className='w-full lg:flex-grow  shadow-md h-60  flex flex-col  justify-center items-center p-3 relative bg-white '>
                    <h1 className='font-bold text-lg absolute top-5 left-2 text-slate-800'>Proteins (Grams)</h1>
                    <ProgressBar className='w-full'
                    completed={proteinVal}
                    maxCompleted={proteinGoal}
                    customLabel=" "
                    bgColor='linear-gradient(to right,#922822,#E5554E)'
                    
                    />
                    <div className='absolute left-4 bottom-6'>
                        <p className='text-slate-800 font-bold'>Goal: <span className='font-normal'>{proteinGoal}g</span></p>
                        <p className='text-slate-800 font-bold'>Consumed: <span className='font-normal'>{proteinVal}g</span></p>
                        <p className='text-slate-800 font-bold'>Remaining: <span className='font-normal'>{remainingProtein}g</span></p>    
                    </div>
                    
                </div>
                <div className='w-full lg:flex-grow  shadow-md h-60  flex flex-col  justify-center items-center p-3 relative bg-white'>
                    <h1 className='font-bold text-lg absolute top-5 left-2 text-slate-800'>Fats (Grams)</h1>
                    <ProgressBar className='w-full'
                    completed={fatsVal}
                    maxCompleted={fatsGoal}
                    customLabel=" "
                    bgColor='linear-gradient(to right,#FF8C00,#FFD580)'
                    
                    />
                    <div className='absolute left-4 bottom-6'>
                        <p className='text-slate-800 font-bold'>Goal: <span className='font-normal'>{fatsGoal}g</span></p>
                        <p className='text-slate-800 font-bold'>Consumed: <span className='font-normal'>{fatsVal}g</span></p>
                        <p className='text-slate-800 font-bold'>Remaining: <span className='font-normal'>{remainingFats}g</span></p>    
                    </div>
                    
                </div>
                <div className='w-full lg:flex-grow  shadow-md h-60  flex flex-col  justify-center items-center p-3 relative bg-white'>
                    <h1 className='font-bold text-lg absolute top-5 left-2 text-slate-800'>Carbs (Grams)</h1>
                    <ProgressBar className='w-full'
                    completed={carbsVal}
                    maxCompleted={carbsGoal}
                    customLabel=" "
                    bgColor='linear-gradient(to right,#1B4D3E,#17B169)'
                    
                    />
                    <div className='absolute left-4 bottom-6'>
                        <p className='text-slate-800 font-bold'>Goal: <span className='font-normal'>{carbsGoal}g</span></p>
                        <p className='text-slate-800 font-bold'>Consumed: <span className='font-normal'>{carbsVal}g</span></p>
                        <p className='text-slate-800 font-bold'>Remaining: <span className='font-normal'>{remainingCarbs}g</span></p>    
                    </div>
                    
                </div>
                
                

            </div>
            </>}
        </div>
    )
    
}


