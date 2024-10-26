import styled from "styled-components";

export const Main = styled.main`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 16px;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadowColor};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
`;

export const InfoContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const H2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

export const Price = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

export const Description = styled.p`
  margin: 0;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.buttonCTA};
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.buttonCTAHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.buttonDisabled};
    cursor: not-allowed;
  }
`;

export const ResenasContainer = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 2rem auto;
`;

export const DivRese = styled.div`
  background: #733fc8;
  grid-column: 1/3;
  grid-row: 1/2;
`;

export const EachDiv = styled.div`
  padding: 1rem 2rem;
  border-radius: 0.8rem;
  box-shadow: ${({ theme }) => theme.shadowColor};
  color: black;
  margin-bottom: 1rem;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  & div {
    margin-right: 1rem;
    & img {
      border-radius: 50%;
      width: 4rem;
      /* border: 2px solid #cec5c5; */
      filter: ${(props) =>
        props.tema === "dark" ? "invert(89%)" : "invert(0)"};
    }
  }
`;

export const Detbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & p {
    margin: 0;
  }
  & .name {
    color: ${({ theme }) => theme.color};
    font-size: 0.9rem;
    margin-bottom: 0.1rem;
    font-weight: 600;
  }

  & .designation {
    color: ${({ theme }) => theme.color};
    opacity: 50%;
    font-size: 0.8rem;
  }
`;

export const Review = styled.div`
  & div {
    display: flex;
    align-items: center;
  }
  & div > h4 {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.color};
    font-weight: 600;
    line-height: 1.5;
    /* margin-bottom: 0.8rem; */
  }
  & p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.color};
    font-weight: 500;
    opacity: 50%;
    line-height: 1.5;
  }
`;

export const FavContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

export const FavIncluye = styled.div`
  // Estilos para FavIncluye si es necesario
`;
