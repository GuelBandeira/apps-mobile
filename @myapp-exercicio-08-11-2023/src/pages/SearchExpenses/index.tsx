import { useState } from 'react'
import { Header } from '../../components/Header'
import { Container, P, Transactions } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Alert } from 'react-native'
import { spendingGetAll } from '../../storage/spending/spendingGetAll'
import { SpendingStorageDTO } from '../../storage/spending/SpendingStorageDTO'
import { TransactionExpenses } from '../../components/TransactionExpenses'
import { FlatList } from 'react-native'

export function SearchExpenses() {
  const [pesquisa, setPesquisa] = useState('')
  const [pesquisaProduto, setPesquisaFornecedor] = useState('')
  const [dataExpense, setDataExpense] = useState<SpendingStorageDTO[]>([]);
  const [somaTotal, setSomaTotal] = useState(0)
  const [quantidadeNotas, setquantidadeNotas] = useState(0)

  async function handleSearchSpending() {

    if ((pesquisa && pesquisa.length > 0) || (pesquisaProduto && pesquisaProduto.length > 0)) {

      const data = await spendingGetAll()

      const newData = data
        .filter(item => ((pesquisaProduto ? item.produto == (pesquisaProduto) : '')) || ((pesquisa ? item.cpf == (pesquisa) : '')))
      console.log(newData)



      function sumMoney(total: number, item: SpendingStorageDTO) {
        return total + (item.valorVenda)
      } ''

      const soma = newData
        .filter(item => item.valorVenda)
        .reduce(sumMoney, 0)

      setSomaTotal(soma)
      setDataExpense(newData)
      setquantidadeNotas(newData.length)

      if (newData.length == 0) {
        Alert.alert("ATENÇÃO", "Nenhum resultado encontrado.")
      }
    }
  }

  return (
    <Container>
      <Header title='Total Gastos' />

      <Input
        placeholder='CPF'
        placeholderTextColor='#363F5F'
        value={pesquisa}
        onChangeText={value => setPesquisa(value)}
      />

      <Input
        placeholder='Produto'
        placeholderTextColor='#363F5F'
        value={pesquisaProduto}
        onChangeText={value => setPesquisaFornecedor(value)}
      />

      <Button
        onPress={handleSearchSpending}
        title='Pesquisar'
      />

      <P>
        {/* {`Total: R$ ${somaTotal.toLocaleString('pt-br', {minimumFractionDigits: 2})} - Quantidade de vendas: ${quantidadeNotas}`} */}
      </P>


      <Transactions>
        <FlatList
          data={dataExpense}
          renderItem={({ item }) =>
            <TransactionExpenses data={item} />
          }
        />
      </Transactions>

    </Container>
  )
}

