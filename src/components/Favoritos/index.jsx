import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { getAllFavs, removeDetail } from "../../redux/actions/favoritos.js"
import Loading from "../Loader/index.jsx"
import FavCard from "./FavCard/index.jsx"
import { List, StyledContainer } from "./styles"


export default function Favoritos ({theme}){
const favs = useSelector( state => state.favorites)
const dispatch = useDispatch();
const {id} = useParams()
const [isLoading,setIsLoading] = useState(true)

useEffect(()=>{
    dispatch(getAllFavs(id));
    return () => {
        dispatch(removeDetail());
    };
}, [dispatch, id]);

useEffect(() => {
    if (favs.userFavorites) {
        setIsLoading(false);
    }
}, [favs.userFavorites]);

return (
    <div>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            progress={undefined}
            theme={theme === 'light' ? 'light' : 'dark'}
        />
        {isLoading ? (
            <Loading />
        ) : (
            <List>
                {favs.userFavorites.length ? (
                    favs.userFavorites.map(id => <FavCard key={id} productId={id} />)
                ) : (
                    <h3>No hay productos en favoritos</h3>
                )}
            </List>
        )}
    </div>
);
}
