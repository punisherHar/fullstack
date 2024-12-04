import { useContext } from "react";
import NavBar from "../navbar/Navbar";
import ProfileContext from "@/context/ProfileContext";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';





export default function History(){
    let {history} = useContext(ProfileContext)
    let date = new Date()
    date = date.toLocaleDateString()
    let historyData = []
    if(history){
        historyData = history.data
    }

    const columns = [
        {field:"id" ,headerName:"ID",width:20},
        {field: 'label', headerName: 'Label',width:180 },
        { field: 'calories', headerName: 'Calories',width:80 },
        { field: 'quantity', headerName: 'Quantity(g)',},
    ]

    const rows = historyData.map((food,index)=>({label: food.label,
                                            quantity:food.quantity,
                                            calories:food.calories,
                                            id:index+1
                                        }))


    
    return(
        <>  
            <NavBar/>
            <Box sx={{width:'100%'}}>
                <div style={{ display: 'flex', flexDirection: 'colums'}}>
                    <DataGrid rows={rows} columns={columns}/>
                </div>
            </Box>

        </>
    )
}