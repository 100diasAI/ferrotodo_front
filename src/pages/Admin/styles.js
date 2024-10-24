import styled from "styled-components";
export const Button = styled.button`
  margin: auto;
  padding: 7px;
  vertical-align: middle;
  display: flex;
  align-items: stretch;
  height: auto;
  background-color: #1877f2;
  border-radius: 5px;
  border: 1px solid #1877f2;
  color: white;
  font-size: 1rem;
  font-weight: bolder;
  cursor: pointer;
  &:hover {
    background-color: green;
    color: white;
    cursor: pointer;
    border-color: black;
    border-style: solid;
  }
`;

export const Text = styled.p`
  padding: 10px;
  /* margin: 20px 0 0 0; */
  /* text-align: justify; */
`
export const DeleteButton = styled(Button)`
    &:hover{
        background-color:red;
        color:black;
    }
`

export const Div = styled.div`
  ...
  width: 100%;
  max-width: 1440px;
  padding: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageContainer = styled.div`
  ...
  @media (max-width: 768px) {
    margin: 20px;
  }
`;

export const Image = styled.img`
  ...
  max-width: 100%;
  height: auto;
`;

export const InfoContainer = styled.div`
  ...
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;
