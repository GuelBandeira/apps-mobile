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
      <Description>CPF: {data.cpf}</Description>
      <Amount>Valor: {data.valorVenda}</Amount>
      <Local>Produto: {data.produto}</Local>
      <Footer>
        {/* <Category>{data.dataVenda}</Category> */}
        {/* <Category>{data.notaFiscal}</Category> */}
        <Date>{data.dataVenda}</Date>
      </Footer>

    </Container>
  )
}