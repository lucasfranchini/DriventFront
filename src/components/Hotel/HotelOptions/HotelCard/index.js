import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import HotelContext from "../../../../contexts/HotelContext";
import useApi from "../../../../hooks/useApi";

export default function HotelCard({ hotelCard }) {
  const { hotelData, setHotelData } = useContext(HotelContext);
  const { hotel } = useApi();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (hotelData?.id === hotelCard.id) setIsSelected(true);
    else setIsSelected(false);
  }, [hotelData]);
  
  function toggleHotelData() {
    if (hotelData?.id === hotelCard.id) setHotelData(null);
    else {
      const result = hotel.GetHotelData(hotelCard.id);
      result.then((res) => {
        const hotel = res.data;
        setHotelData({ ...hotel, RoomSelected: null });
      });
      result.catch((err) => {
        toast(err.response.data.message);
      });
    }
  }

  return (
    <Card onClick={toggleHotelData} isSelected={isSelected}>
      <img src={hotelCard.image} alt={hotelCard.name} />
      <h1>{hotelCard.name}</h1>
      <Property>
        <Title>Tipos de acomodação:</Title>
        <span>
          {hotelCard.allRoomsTypes ? (
            hotelCard.allRoomsTypes.map((currentType, index) => (
              <span key={index}>
                {currentType}
                {index < hotelCard.allRoomsTypes.length - 1 && ","}{" "}
              </span>
            ))
          ) : (
            <span>Nenhum quarto nesse hotel </span>
          )}
        </span>
      </Property>
      <Property>
        <Title>Vagas disponíveis:</Title>
        <span>{hotelCard.totalvacancies}</span>
      </Property>
    </Card>
  );
}

const Card = styled.div`
  width: 196px;
  height: 264px;
  border-radius: 10px;
  padding: 15px;
  font-family: "Roboto";
  background-color: ${(props) => (props.isSelected ? "#FFEED2" : "#f1f1f1")};
  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }
  h1 {
    font-size: 20px;
    line-height: 23px;
    margin-top: 10px;
  }
`;
const Property = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  color: #3c3c3c;
`;
const Title = styled.span`
  font-weight: 700;
  margin-bottom: 2px;
`;
