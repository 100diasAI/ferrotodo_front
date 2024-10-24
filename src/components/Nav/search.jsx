import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { getProductsSearch } from "../../redux/actions/product";
import style from "./nav.module.css";
import { Ulauto, Liauto, Image } from "./style";

function Search({ data = [] }) {
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 1) {
      const filterSuggestions = data.filter(
        (suggestion) => suggestion.nombre.toLowerCase().includes(query)
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setSuggestionsActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== "") dispatch(getProductsSearch({ name: value }));
  };

  return (
    <div className={style.searchbar}>
      <div className={style.searchbar_wrapper}>
        <div className={style.searchbar_left}>
          <span className={style.search_icon}>
            <BsSearch />
          </span>
        </div>
        <div className={style.searchbar_center}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className={style.searchbar_input}
              placeholder="Buscar ..."
              value={value}
              onChange={handleChange}
            />
          </form>
        </div>
      </div>
      {suggestionsActive && (
        <Ulauto>
          {suggestions.map((suggestion, index) => {
            return (
              <Liauto key={index} onClick={handleClick}>
                <Image src={suggestion.im} alt={suggestion.nombre} />
                <p>{suggestion.nombre}</p>
              </Liauto>
            );
          })}
        </Ulauto>
      )}
    </div>
  );
}

export default Search;
