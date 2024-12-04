
import * as React from 'react';
import { DateRange, FoodBank, TextFields } from '@mui/icons-material';
import { useContext, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from 'react-responsive';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TrackContext, { TrackProvider } from '@/context/TrackContext';
import AuthContext from '@/context/AuthContext';
import axios, {isCancel, AxiosError} from 'axios';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ProfileContext from '@/context/ProfileContext';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: '#334155',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: '#334155',
    }),
  },
}));


export default function Recipe(props){
    const bigScreens = useMediaQuery({ minWidth: 1024 })
    const [open, setOpen] = useState(false)
    const {removeFromFavorites,addToFavorites} = useContext(ProfileContext)
    const {data,updateTrack,updateTrackId,id}  = useContext(TrackContext)
    const {tokens,logoutUser} = useContext(AuthContext)
    const [showOptions,setShowOption] = useState(false)
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const openEl = Boolean(anchorEl);
    const {label,proteins,carbs,calories,fats,weight} = props
    let date = new Date()
    date = date.toLocaleDateString()
    const recipeDetails = {
        weight : weight,
        label : label,
        proteins : proteins,
        carbs : carbs,
        calories : calories,
        fats : fats,
    }
    const addToFavoritesData = {
        ...recipeDetails,
        date:date,
        quantity:0
    }
    const handleClick = (event) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }
    const handleCloseEl = (event) => {
        event.stopPropagation()
        setAnchorEl(null)
    }
    
    const handleClickOpen = (event) => {
        event.stopPropagation()
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return(
    <>  
        <div className='flex items-center  min-w-[390px] md:w-[390px] lg:w-[700px] gap-1 max-w-4/3 2xl:w-1/2 bg-white p-2 shadow-sm justify-between rounded md:h-[60px] cursor-pointer relative '
            onClick={props.onClick}
        >
            <div className='flex flex-col gap-2'>
                <h1 className=' font-bold text-slate-800 '>{props.label}  {!bigScreens && <span className='text-slate-800 font-normal'>({props.weight})g</span>}</h1>
                <div className='flex gap-1 md:gap-6 pb-2'>
                    <p className='border-r-2  md:pr-3' style={{ paddingRight: '2px' }}>Calories:{props.calories}</p>
                    <p className='border-r-2 md:pr-3' style={{ paddingRight: '2px' }}>Proteins:{props.proteins}g</p>
                    <p className='border-r-2 md:pr-3' style={{ paddingRight: '2px' }}>Fats:{props.fats}g</p>
                    <p className='border-r-2  md:pr-3' style={{ paddingRight: '2px' }}>Carbs:{props.carbs}g</p>

                    {bigScreens && <p className='border-r-2 md:pr-3'>weight:{props.weight}g</p>}
                </div>
                
            </div>
            <div className='flex flex-col align-items-center  md:flex-row justify-center gap-2'>
                <AddIcon className='bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-800' sx={{ color: '#ffff' }} onClick={handleClickOpen}/>
                <div>
                    <Button

                        id="demo-customized-button"
                        aria-controls={openEl ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openEl ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClick}
                        // endIcon={}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                maxWidth: "24px",
                                minWidth: "24px", 
                                width: "24px",    
                                height: "24px",
                                padding: '0',     
                                backgroundColor: '#475569',
                                color: '#fff',
                                '& .MuiButton-label': {
                                padding: '0',
                                },
                                '&:hover': {
                                backgroundColor: '#1E293B',
                                },
                            }}
                    >
                        <KeyboardArrowDownIcon
                                sx={{fontSize:18}}
                            />
                    </Button>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={openEl}
                        onClose={handleCloseEl}
                    >
                        <MenuItem onClick={
                            ()=>{
                                if(props.isFavorite === true){
                                    removeFromFavorites(addToFavoritesData)
                                    setAnchorEl(false)
                                }else{
                                    addToFavorites(addToFavoritesData)
                                }
                                setAnchorEl(false)
                            }
                        }
                        disableRipple>
                        {props.isFavorite ? <BookmarkIcon/> :<BookmarkBorderIcon/>}
                        {props.isFavorite ?<p>Remove from favorites</p> : <p>Add to favorites</p>}
                        </MenuItem>
                    </StyledMenu>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: async(event) =>{
                            event.preventDefault()
                            const formData = new FormData(event.currentTarget)
                            const formJson = Object.fromEntries(formData.entries())
                            const quantity = formJson.quantity;

                            //make the request and update the context 
                            try{
                                
                                const url = `http://localhost:8000/api/tracks/add-food/`
                                const config = {
                                headers: { Authorization: `Bearer ${tokens.access}` },
                                };
                                const data = {
                                    quantity: quantity,
                                    weight: props.weight,
                                    calories: props.calories,
                                    proteins:props.proteins,
                                    fats: props.fats,
                                    carbs: props.carbs,
                                    label:props.label,
                                    date:date
                                };

                                let response = await axios.post(url,data,config);
                                if(response.status === 200){
                                    if(id){
                                        console.log(id)
                                        updateTrack(id)
                                        handleClose()
                                        navigate("/")
                                    }            
                                }
                            }
                            catch(err){
                                logoutUser()
                            }
                        },
                    }}
                >
                    <DialogTitle className='text-gray-900 text-xl'>{props.label}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Quantity(g)
                        </DialogContentText>
                        <TextField 
                            autoFocus
                            required
                            name="quantity"
                            type='number'
                            variant='standard'
                            inputProps={{ min: 1 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={handleClose}>Cancel</Button>
                        <Button color="primary" type='submit'>log</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    </>
)}