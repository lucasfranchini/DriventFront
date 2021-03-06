import Typography from "@material-ui/core/Typography";
import { useContext, useState } from "react";
import styled from "styled-components";
import BookingContext from "../../../contexts/BookingContext";
import getBookingPrice from "../../../components/Payment/Helpers/getBookingPrice";
import CreditCard from "../../../components/Payment/CreditCard";
import IsPaid from "../../../components/Payment/IsPaid";
import Button from "../../../components/Form/Button";

export default function Payment() {
  const { bookingData } = useContext(BookingContext);
  const { modality, lodge } = bookingData;
  const [isSendingInfo, setIsSendingInfo] = useState(false);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <NewSession >
        <h2>Ingresso escolhido</h2>
      </NewSession>
      <TicketChoosed>
        <h3>{lodge? modality.type + " + " + lodge.type : modality.type}</h3>
        <h4>R$ { getBookingPrice(bookingData) }</h4>
      </TicketChoosed>
      <NewSession >
        <h2>Pagamento</h2>
      </NewSession>
      {bookingData?.isPaid ?
        <IsPaid />
        :
        <>
          <CreditCard setIsSendingInfo={setIsSendingInfo}/>
          <OrderButton form="cc-form" pay={true} type="submit" >
            {isSendingInfo ? "": "FINALIZAR PAGAMENTO"}
          </OrderButton>
        </>
      }
    </>  
  );
}
const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
const TicketChoosed = styled.div`
  width: 280px;
  height: 108px;
  background: #FFEED2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
  margin-bottom: 30px;
  h3 {
    color: #454545;
    font-size: 16px;
    margin-bottom: 8px;
  }
  h4 {
    font-size: 15px;
    color: #898989;
  }
`;
const NewSession = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 20px;
    font-weight: 400;
    color: #8e8e8e;
    margin-bottom: 15px;
  }
`;
const OrderButton = styled(Button)`
  font-family: "Roboto" !important;
  margin-top: 17px !important;
  color: #000 !important;
`;
