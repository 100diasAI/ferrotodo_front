import ListContainer from "../../containers/ListContainer";

export default function Compras({ theme }) {
  document.title = "FerreTodo - Compras";
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
  return (
    <div>
      <ListContainer theme={theme} />
    </div>
  );
}
