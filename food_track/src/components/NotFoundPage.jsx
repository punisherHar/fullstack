import {Link} from "react-router-dom";


export default function NotFoundPage(){
    return(
        <center className="h-full flex items-center gap-3 justify-center flex-col"><div className=" text-5xl">
            404 NOT FOUND
            </div>
            <span className="text-5xl"><Link to="/">Go back to Home</Link></span>
        </center>
        
    )
}