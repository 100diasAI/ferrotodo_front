import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavProducts } from "../../../redux/actions/favoritos";
import Loading from "../../Loader";
import FavIcon from "../../FavContainer";
import {
  CardContainer,
  ImgContainer,
  LinkTo,
  Price,
  Text,
} from "./styles";

export default function FavCard({ productId }) {
  const [isLoading, setIsLoading] = useState(true);
  const favProduct = useSelector((state) => state.favorites.favDetail.find(p => p.id === productId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId && !favProduct) {
      dispatch(getFavProducts(productId)).then(() => setIsLoading(false));
    } else if (favProduct) {
      setIsLoading(false);
    }
  }, [dispatch, productId, favProduct]);

  if (isLoading) return <Loading />;

  if (!favProduct) return <div>Cargando detalles del producto...</div>;

  return (
    <CardContainer>
      <FavIcon productId={productId} productName={favProduct.nombre} />
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
