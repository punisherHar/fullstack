import { useContext } from 'react'
import Navbar from '../navbar/Navbar'
import NutientsTrack from './NutrientsTrack'
import AuthContext from '@/context/AuthContext'
import TrackContext, { TrackProvider } from '@/context/TrackContext'

export default function HomePage(){

    return(
        <>  
            <TrackProvider>
                <Navbar/>
                <NutientsTrack/>
            </TrackProvider>
        </>
    )
}