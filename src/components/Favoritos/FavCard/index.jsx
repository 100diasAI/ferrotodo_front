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
  const favProducts = useSelector((state) => state.favorites.favDetail);
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavProducts(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (favProducts) {
      const product = favProducts.find((p) => p.id === productId);
      if (product) {
        setData(product);
        setIsLoading(false);
      }
    }
  }, [favProducts, productId]);

  if (isLoading) return <Loading />;

  return (
    <CardContainer>
      <FavIcon productId={productId} productName={data.nombre} />
      <ImgContainer>
        <LinkTo to={`/detail/${productId}`}>
          <img src={data.imagen} alt={data.nombre} />
        </LinkTo>
      </ImgContainer>
      <Text>
        <h3>{data.nombre}</h3>
        <p>{data.descripcion}</p>
      </Text>
      <Price>Precio: ${data.precio}</Price>
    </CardContainer>
  );
}
