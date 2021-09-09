import styled from "styled-components";

export default function reviewHotelCard({ reservation }) {
  return (
    <Card>
      <img src={reservation.hotel.image} alt={reservation.hotel.name} />
      <h1>{reservation.hotel.name}</h1>
      <Property>
        <Title>Quarto reservado</Title>
        <span>{reservation.room.number}</span>
      </Property>
      <Property>
        <Title>Pessoas no seu quarto</Title>
        {reservation.otherPeopleInRoom === 0
          ? <span>Apenas você no quarto</span> 
          : <span>Você e mais {reservation.otherPeopleInRoom}</span>
        }
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
  background-color: #FFEED2;
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
