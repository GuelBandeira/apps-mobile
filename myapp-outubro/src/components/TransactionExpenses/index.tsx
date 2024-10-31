import {
  Container,
  Description,
  Amount,
  Local,
  Footer,
  Category,
  Date,
} from "./styles";

import { SpendingStorageDTO }
  from "../../storage/spending/SpendingStorageDTO";

type Props = {
  data: SpendingStorageDTO
}

export function TransactionExpenses({ data }: Props) {
  return (
    <Container>
      <Description>{data.name}</Description>
      <Amount>{data.amount}</Amount>
      <Local>{data.local}</Local>
      <Footer>
        <Category>{data.category}</Category>
        <Date>{data.datePurchase}</Date>
      </Footer>

    </Container>
  )
}