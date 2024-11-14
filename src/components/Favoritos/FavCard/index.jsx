import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavProducts, deleteUserFav } from "../../../redux/actions/favoritos";
import Loading from "../../Loader";
import {
  CardContainer,
  ImgContainer,
  LinkTo,
  Price,
  Text,
  DeleteButton
} from "./styles";
import { toast } from "react-toastify";

export default function FavCard({ productId }) {
  const [isLoading, setIsLoading] = useState(true);
  const favProduct = useSelector((state) => state.favorites.favDetail.find(p => p.id === productId));
  const userId = useSelector((state) => state.auth.user?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId && !favProduct) {
      dispatch(getFavProducts(productId)).then(() => setIsLoading(false));
    } else if (favProduct) {
      setIsLoading(false);
    }
  }, [dispatch, productId, favProduct]);

  const handleDelete = () => {
    dispatch(deleteUserFav(userId, productId));
    toast.error(`${favProduct.nombre} eliminado de favoritos`);
  };

  if (isLoading) return <Loading />;
  if (!favProduct) return <div>Cargando detalles del producto...</div>;

  return (
    <CardContainer>
      <DeleteButton onClick={handleDelete}>
        Eliminar de favoritos
      </DeleteButton>
      <ImgContainer>
        <LinkTo to={`/detail/${productId}`}>
          <img src={favProduct.urlimagen} alt={favProduct.nombre} />
        </LinkTo>
      </ImgContainer>
      <Text>
        <h3>{favProduct.nombre}</h3>
        <p>{favProduct.descripcion}</p>
      </Text>
      <Price>Precio: ${favProduct.precio}</Price>
    </CardContainer>
  );
}
