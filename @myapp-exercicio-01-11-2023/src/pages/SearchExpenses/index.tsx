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
  const [pesquisaFornecedor, setPesquisaFornecedor] = useState('')
  const [dataExpense, setDataExpense] = useState<SpendingStorageDTO[]>([]);
  const [somaFornecedor, setSomaFornecedor] = useState(0)
  const [quantidadeNotas, setquantidadeNotas] = useState(0)

  async function handleSearchSpending() {

    if(pesquisa && pesquisa.length > 0 && pesquisaFornecedor && pesquisaFornecedor.length > 0) {

    const data = await spendingGetAll()
    const newData = data
      .filter(item => (item.fornecedor == (pesquisaFornecedor)) && (item.codigoImposto === parseInt(pesquisa)))
    console.log(newData)



    function sumMoney(total: number, item: SpendingStorageDTO) {
      return total + (item.valorImposto)
    }''

    const soma = newData
      .filter(item => item.valorImposto)
      .reduce(sumMoney, 0)

    setSomaFornecedor(soma)
    setDataExpense(newData)
    setquantidadeNotas(newData.length)

    if (newData.length == 0){
      Alert.alert("ATENÇÃO", "Nenhum resultado encontrado.")
    }
  }else{
    Alert.alert("ATENÇÃO", "Cheque se os campo estão preenchidos e clique em pesquisar.")
  }
  }

  return (
    <Container>
      <Header title='Total Gastos' />

      <Input
        placeholder='Codigo do Imposto'
        placeholderTextColor='#363F5F'
        value={pesquisa}
        onChangeText={value => setPesquisa(value)}
      />

<Input
        placeholder='Fornecedor'
        placeholderTextColor='#363F5F'
        value={pesquisaFornecedor}
        onChangeText={value => setPesquisaFornecedor(value)}
      />

      <Button
        onPress={handleSearchSpending}
        title='Pesquisar'
      />

      <P>
        {`Total: R$ ${somaFornecedor.toLocaleString('pt-br', {minimumFractionDigits: 2})} - Quantidade de notas: ${quantidadeNotas}`}
      </P>


      {/* <Transactions>
        <FlatList
          data={dataExpense}
          renderItem={({ item }) =>
            <TransactionExpenses data={item} />
          }
        />
      </Transactions> */}

    </Container>
  )
}

