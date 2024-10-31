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
  // const [pesquisaProduto, setPesquisaFornecedor] = useState('')
  const [dataExpense, setDataExpense] = useState<SpendingStorageDTO[]>([]);
  const [somaTotal, setSomaTotal] = useState(0)
  const [quantidadeNotas, setquantidadeNotas] = useState(0)

  async function handleSearchSpending() {

    if ((pesquisa && pesquisa.length > 0)) {

      const data = await spendingGetAll()

      const newData = data
        .filter(item => ((pesquisa ? item.codigoCliente == (pesquisa) : '')))
      console.log(newData)



      function sumMoney(total: number, item: SpendingStorageDTO) {
        return total + (item.valorImposto)
      } ''

      const soma = newData
        .filter(item => item.valorImposto)
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
        placeholder='Código do cliente'
        placeholderTextColor='#363F5F'
        value={pesquisa}
        onChangeText={value => setPesquisa(value)}
      />

      {/* <Input
        placeholder='Produto'
        placeholderTextColor='#363F5F'
        value={pesquisaProduto}
        onChangeText={value => setPesquisaFornecedor(value)}
      /> */}

      <Button
        onPress={handleSearchSpending}
        title='Pesquisar'
      />

      <P>
        {`Total de imposto: R$ ${somaTotal.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}
      </P>
      <P>
        {`Qtd. de veículos: ${quantidadeNotas}`}
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

