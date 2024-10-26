import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 33%);
  grid-auto-flow: row;
  justify-items: center;
  position: relative;
  margin: auto;
  margin-bottom: 1rem;
  -webkit-box-shadow: 0px 4px 15px 0px rgba(153, 153, 153, 1);
  -moz-box-shadow: 0px 4px 15px 0px rgba(153, 153, 153, 1);
  box-shadow: 0px 4px 15px 0px rgba(153, 153, 153, 1);
  width: 90%;
`;
export const FavContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  margin: 10px;
`;

export const CardLi = styled.li`
  align-self: center;
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
`;
export const Img = styled.img`
  height: 10rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  -webkit-box-shadow: 0px 4px 15px 0px rgba(153, 153, 153, 1);
  -moz-box-shadow: 0px 4px 15px 0px rgba(153, 153, 153, 1);
  box-shadow: 0px 4px 15px 0px rgba(153, 153, 153, 1);
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 15px 0px rgba(153, 153, 153, 0.5);
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ImgContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 15px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const LinkTo = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const Text = styled.div`
  text-align: center;
  margin-bottom: 10px;

  h3 {
    margin-bottom: 5px;
  }

  p {
    font-size: 0.9em;
    color: #666;
  }
`;

export const Price = styled.h4`
  font-weight: bold;
  color: #4a4a4a;
`;

export const StockInfo = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;
