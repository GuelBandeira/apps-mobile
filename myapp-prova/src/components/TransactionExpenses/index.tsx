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
      <Description>Código Cliente: {data.codigoCliente}</Description>
      <Local>Nome do Veículo: {data.nomeVeiculo}</Local>
      <Amount>Valor do Veículo: R$ {data.valorVeiculo.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</Amount>
      <Local>Valor do imposto: R$ {((data.valorImposto ? (data.valorImposto.toLocaleString('pt-br', { minimumFractionDigits: 2 })) : ''))}</Local>
      <Footer>
        {/* <Category>{data.dataVenda}</Category> */}
        {/* <Category>{data.notaFiscal}</Category> */}
        <Date>{data.dataVeiculo}</Date>
        <Date>{data.corVeiculo}</Date>
      </Footer>

    </Container>
  )
}