import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaTools, FaCar, FaWarehouse, FaPlug, FaBoxOpen } from "react-icons/fa";
import { GiAutoRepair, GiHammerNails } from "react-icons/gi";
import { BsArrowDownUp, BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { orderByCategoryName, orderBy, getProducts, filterByBrands } from "../../redux/actions/product";
import { 
  ProductFilterContainer,
  CategoriesContainer, 
  Category, 
  Name, 
  Select,
  Option,
  FilterTitle,
  DivFilterTitle,
  AccordionSection,
  AccordionTitle,
  AccordionContent,
  CheckboxLabel
} from "./styles";

function LeftBar({resetPagina}) {
  const [category, setCategory] = useState("");
  const [orderByValue, setOrderByValue] = useState("");
  const [input, setInput] = useState({orden: "A-Z"});
  const [showCategories, setShowCategories] = useState(true);
  const [showBrands, setShowBrands] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const dispatch = useDispatch();

  const subcategories = [
    { name: "Todos", icon: <FaTools /> },
    { name: "Automotriz", icon: <FaCar /> },
    { name: "Ferreteria", icon: <GiHammerNails /> },
    { name: "Herramientas Manuales", icon: <GiAutoRepair /> },
    { name: "Accesorios de Herramientas eléctricas", icon: <FaPlug /> },
    { name: "Organizacion y Almacenaje", icon: <FaWarehouse /> },
    { name: "Herramientas Eléctricas", icon: <FaBoxOpen /> },
  ];

  const brands = ["Marca1", "Marca2", "Marca3", "Marca4"]; // Reemplaza con las marcas reales

  useEffect(() => {
    if (category) dispatch(orderByCategoryName(category));
    resetPagina(1);
    setInput({orden: "A-Z"});
  }, [category]);

  useEffect(() => {
    if(orderByValue) dispatch(orderBy(orderByValue))
    resetPagina(1)
  }, [orderByValue]);

  useEffect(() => {
    dispatch(filterByBrands(selectedBrands));
    resetPagina(1);
  }, [selectedBrands]);

  function handleCategory(category) {
    setCategory(category);
    resetPagina(1);
    setInput({orden: "A-Z"});
  }

  function changeOrderBy(e){
    setOrderByValue(e.target.value);
    setInput(e.target.value);
  }

  function handleBrandChange(brand) {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  }

  return (
    <ProductFilterContainer>
      

      <DivFilterTitle>
        <FilterTitle>Ordenar</FilterTitle>
        <BsArrowDownUp />
      </DivFilterTitle>
      <Select onChange={(e) => changeOrderBy(e)} value={input.orden}>
        <Option>Precio Asc</Option>
        <Option>Precio Desc</Option>
        <Option>A-Z</Option>
        <Option>Z-A</Option>
      </Select>
    </ProductFilterContainer>
  );
}

export default LeftBar;
