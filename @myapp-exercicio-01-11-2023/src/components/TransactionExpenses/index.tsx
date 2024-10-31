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
      <Description>{data.produto}</Description>
      <Amount>{data.valorImposto}</Amount>
      <Local>{data.fornecedor}</Local>
      <Footer>
        <Category>{data.codigoImposto}</Category>
        <Category>{data.notaFiscal}</Category>
        <Date>{data.dataNotaFiscal}</Date>
      </Footer>

    </Container>
  )
}