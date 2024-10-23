import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import FavIcon from "../../components/FavContainer";
import Loading from "../../components/Loader";
import {
  addToCart,
  modifyItemStock,
  setItemStock,
  setLocalStorage,
} from "../../redux/actions/cart";
import { clearProduct, getProduct } from "../../redux/actions/product";
import { getProductReviews } from "../../redux/actions/reviews";
import estilos from "./detail.module.css";
import {
  Button,
  Description,
  Detbox,
  Div,
  DivRese,
  EachDiv,
  FavContainer,
  H2,
  Image,
  ImageContainer,
  InfoContainer,
  Main,
  P,
  ResenasContainer,
  Review,
  Price,
  UserDetails,
  FavIncluye,
} from "./styles";

const stars = Array(5).fill(0);
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const ProductDetail = ({theme}) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingReview, setLoadingReview] = useState(true);
  const [text, setText] = useState(null);
  const [resenas, setResenas] = useState([]);

  let dispatch = useDispatch();
  let [cart, product, error, currentStock] = useSelector((state) => [
    state.cart,
    state.product.product,
    state.product.error,
    state.cart.cartRemainingStock,
  ]);
  const { user: currentUser } = useSelector((state) => state.auth);
  let { productId } = useParams();

  document.title = "FerreTodo - "+product.nombre;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  useEffect(() => {
    if (!Object.keys(product).length) {
      dispatch(getProduct(productId));
      dispatch(getProductReviews(productId)).then((res) => {
        if (res.payload.length === 0) {
          setLoadingReview(false);
          setText("No hay reseñas de este producto");
        } else {
          setLoadingReview(false);
          setText("Reseñas");
          setResenas(res.payload);
        }
      });
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [product]);

  useEffect(() => {
    return () => {
      dispatch(setLocalStorage(cart));
      dispatch(clearProduct());
    };
  }, []);

  const checkStock = async (cantidad = 1) => {
    const product = await axios.get(
      `http://localhost:3001/product/${productId}`
    );
    return product.data.stock >= cantidad;
  };

  useEffect(() => {
    if (Object.keys(product).length) {
      setStock(product.stock);
    }
  }, [product]);

  const addCart = async () => {
    let order = {
      ...product,
      cantidad: 1,
    };

    const check = await checkStock();
    if (check) {
      let index = currentStock.findIndex((p) => p.id === parseInt(productId));
      if (index !== -1) {
        if (currentStock[index].stock - 1 >= 0) {
          dispatch(modifyItemStock(parseInt(productId)));
          dispatch(addToCart(order));
          toast.success("Agregado al carrito");
          setStock((stock) => (stock -= 1));
        } else {
          toast.error("No hay más stock");
        }
      } else {
        dispatch(addToCart(order));
        dispatch(setItemStock(parseInt(productId)));
        toast.success("Agregado al carrito");
        setStock((stock) => (stock -= 1));
      }
    } else {
      toast.error(`No hay stock `);
    }
  };

  if (error) return <div>Error! {error.message}</div>;
  if (isLoading)
    return (
      <div>
        <Loading alto={"1000px"} />
      </div>
    );

  const formatPrice = new Intl.NumberFormat("es-BO").format(product.precio);

  return (
    <Main>
      {
        theme === 'light' ? (<ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          progress={undefined}
        />) : (<ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          progress={undefined}
          theme={'dark'}
        />)
      }
      <Div>
        <ImageContainer>
          <FavContainer>
            <FavIncluye>
              {currentUser ? (
                <FavIcon
                  productId={parseInt(productId)}
                  productName={product.nombre}
                />
              ) : null}
            </FavIncluye>
          </FavContainer>
          <Image src={product?.urlimagen} />
        </ImageContainer>
        <InfoContainer>
          <H2>{product?.nombre}</H2>
          <Price>Precio: Bs{formatPrice}</Price>
          {stock > 0 && <P>Disponible: {stock}</P>}
          <Description>{product.descripcion}</Description>
          {product.marca && <P>Marca: {product.marca}</P>}
          {product.categoria && <P>Categoría: {product.categoria}</P>}
          {product.subcategoria && <P>Subcategoría: {product.subcategoria}</P>}
          <Button onClick={addCart} disabled={stock === 0}>
            {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
          </Button>
        </InfoContainer>
      </Div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <h2>{resenas.length ? text : null}</h2>
        <ResenasContainer>
          {loadingReview ? (
            <Loading />
          ) : (
            <>
              {resenas.length > 0 &&
                resenas.map((r) => (
                  <>
                    <EachDiv class="div1 eachdiv">
                      <UserDetails class="userdetails" tema={theme}>
                        <div>
                          <img
                            src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
                            alt=""
                          />
                        </div>
                        <Detbox>
                          <p className="name">{r.usuario.nombre}</p>
                          <p class="designation">{r.usuario.mail}</p>
                        </Detbox>
                      </UserDetails>
                      <Review>
                        <div style={{ marginTop: "1rem" }}>
                          <h4>{r.titulo}</h4>
                          <Stars>
                            {stars.map((_, index) => {
                              return (
                                <FaStar
                                  key={index}
                                  size={15}
                                  color={
                                    r.puntaje > index
                                      ? colors.orange
                                      : colors.grey
                                  }
                                  style={{
                                    marginRight: 5,
                                  }}
                                />
                              );
                            })}
                          </Stars>
                        </div>

                        <p>{r.comentario}</p>
                      </Review>
                    </EachDiv>
                  </>
                ))}
            </>
          )}
        </ResenasContainer>
      </div>
    </Main>
  );
};

export default ProductDetail;
