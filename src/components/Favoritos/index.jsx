import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllFavs, getFavProducts } from "../../redux/actions/favoritos.js"
import Loading from "../Loader/index.jsx"
import FavCard from "./FavCard/index.jsx"
import { List } from "./styles"

export default function Favoritos ({theme}){
  const dispatch = useDispatch();
  const favs = useSelector((state) => state.favorites.userFavorites);
  const userId = useSelector((state) => state.auth.user?.id);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (userId) {
          await dispatch(getAllFavs(userId));
        } else {
          setError("Usuario no autenticado");
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("No se pudieron cargar los favoritos. Por favor, intente de nuevo más tarde.");
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [dispatch, userId]);

  useEffect(() => {
    if (favs && favs.length > 0) {
      favs.forEach(id => dispatch(getFavProducts(id)));
    }
  }, [dispatch, favs]);

  if (isLoading) return <Loading />;
  if (error) return <div>{error}</div>;

  console.log("Favoritos en el componente:", favs);

  return (
    <div>
      <List>
        {favs && favs.length > 0 ? (
          favs.map((id) => <FavCard key={id} productId={id} />)
        ) : (
          <h3>No hay productos en favoritos</h3>
        )}
      </List>
    </div>
  );
}
