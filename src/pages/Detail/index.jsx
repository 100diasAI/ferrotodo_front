import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../components/Loader";
import { addToCart } from "../../redux/actions/cart";
import { getProduct } from "../../redux/actions/product";
import { getProductReviews } from "../../redux/actions/reviews";
import {
  Button,
  Description,
  Div,
  H2,
  Image,
  ImageContainer,
  InfoContainer,
  Main,
  Price,
  ResenasContainer,
} from "./styles";

const ProductDetail = ({ theme }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getProduct(productId));
    dispatch(getProductReviews(productId));
    setIsLoading(false);
  }, [dispatch, productId]);

  if (isLoading) return <Loading alto={"1000px"} />;

  const formatPrice = (price) => {
    if (price == null || isNaN(price)) return 'Precio no disponible';
    return new Intl.NumberFormat("es-BO").format(price);
  };

  return (
    <Main>
      <ToastContainer theme={theme === 'light' ? 'light' : 'dark'} />
      <Div>
        <ImageContainer>
          <Image src={product?.urlimagen} alt={product?.nombre} />
        </ImageContainer>
        <InfoContainer>
          <H2>{product?.nombre}</H2>
          <Price>Precio: Bs {formatPrice(product.precio)}</Price>
          <Description>{product.descripcion}</Description>
          <Button onClick={() => dispatch(addToCart(currentUser.id, product.id, 1))}>
            Agregar al carrito
          </Button>
        </InfoContainer>
      </Div>
      <ResenasContainer>
        {/* Aquí iría el código para mostrar las reseñas */}
      </ResenasContainer>
    </Main>
  );
};

export default ProductDetail;
