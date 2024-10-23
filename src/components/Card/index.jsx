import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPopUp from "../PopUp";
import {
  addToCart,
  modifyItemStock,
  setItemStock,
} from "../../redux/actions/cart";
import {
  DIV,
  ContainerImage,
  Image,
  InfoContainer,
  PriceContainer, // Cambiado a PriceContainer
  Button,
  H2,
  StyledPopup,
  P,
  ImgLink,
  NoButton,
  FavContainer,
  DivBis,
} from "./styles";
import axios from "axios";
import { toast } from "react-toastify";
import FavIcon from "../FavContainer";

const Card = ({ id, nombre, urlimagen, descripcion, precio, stock }) => {
  const [open, setOpen] = useState(false);
  const [isInStock, setIsInStock] = useState(stock > 0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();

  const currentStock = useSelector((state) => state.cart.cartRemainingStock);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    //console.log("Card props:", { id, nombre, urlimagen, descripcion, precio, stock });
  }, []);

  const closeModal = () => setOpen(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoaded(false);
    setImageError(true);
    console.error(`Error loading image for product: ${id}`);
  };

  const checkStock = async (cantidad = 1) => {
    try {
      const product = await axios.get(`http://localhost:3001/product/${id}`);
      if (product.data.stock >= cantidad) return true;
      handleStockError();
      return false;
    } catch (error) {
      console.error("Error checking stock:", error);
      handleStockError();
      return false;
    }
  };

  const handleStockError = () => {
    toast.error(`No hay más stock de ${nombre}`, {
      toastId: "NoStockOnCard",
    });
    setIsInStock(false);
  };

  const handleAddCart = async () => {
    let order = {
      id,
      nombre,
      descripcion,
      urlimagen,
      precio,
      cantidad: 1,
    };
    const check = await checkStock();
    if (check) {
      let index = currentStock.findIndex((p) => p.id === id);
      if (index !== -1) {
        if (currentStock[index].stock - 1 >= 0) {
          dispatch(modifyItemStock(id));
          dispatch(addToCart(order));
          setOpen((isOpen) => !isOpen);
        } else {
          handleStockError();
        }
      } else {
        dispatch(addToCart(order));
        dispatch(setItemStock(id));
        setOpen((isOpen) => !isOpen);
      }
    }
  };

  const formatPrice = new Intl.NumberFormat("es-AR").format(precio);

  return (
    <DIV>
      <ContainerImage>
        <DivBis>
          <FavContainer>
            {currentUser ? (
              <FavIcon productId={id} productName={nombre} />
            ) : null}
          </FavContainer>
        </DivBis>

        <ImgLink to={`/detail/${id}`}>
          {!imageLoaded && !imageError && <p>Cargando imagen...</p>}
          {imageError && <p>Error al cargar la imagen</p>}
          <Image 
            src={urlimagen} 
            alt={nombre} 
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        </ImgLink>
      </ContainerImage>
      <InfoContainer>
        <H2 to={`/detail/${id}`}>{nombre}</H2>
        <div>
          <PriceContainer>
            <P>Bs {formatPrice}</P>
          </PriceContainer>
          {isInStock ? (
            <Button onClick={handleAddCart}>Añadir al carrito</Button>
          ) : (
            <NoButton className="NoStock" onClick={handleAddCart}>
              No hay stock
            </NoButton>
          )}
          <StyledPopup open={open} closeOnDocumentClick onClose={closeModal}>
            <AddPopUp
              id={id}
              nombre={nombre}
              img={urlimagen}
              precio={precio}
              close={closeModal}
              checkStock={checkStock}
              currentStock={currentStock}
            />
          </StyledPopup>
        </div>
      </InfoContainer>
    </DIV>
  );
};

export default Card;
