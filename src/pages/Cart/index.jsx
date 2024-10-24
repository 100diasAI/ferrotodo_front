import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCart from "../../containers/CartContainer";
import { getLocalStorage } from "../../redux/actions/cart";

export default function Cart({ theme }) {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) {
      dispatch(getLocalStorage(currentUser.id));
    }
  }, [currentUser, dispatch]);

  document.title = "FerreTodo - Carrito";
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  return (
    <div style={{ paddingTop: "2rem", minHeight: "70vh" }}>
      <ShoppingCart theme={theme} />
    </div>
  );
}
