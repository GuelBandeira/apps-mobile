import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Container } from './styles'
import { InputAmount } from '../../components/InputAmount'
import { InputDate } from '../../components/InputDate'
import { spendingCreate } from '../../storage/spending/spendingCreate'
import { spendingGetAll } from '../../storage/spending/spendingGetAll'
import { formatAmount } from '../../utils/formatAmount'
import { Alert } from 'react-native'

export function Dashboard() {

  const [cpf, setCPF] = useState('')
  const [produto, setProduto] = useState('')
  const [valorVenda, setValorVenda] = useState('')
  const [dataVenda, setDataVenda] = useState('')

  async function handleAddNewSpending() {

    // await AsyncStorage.clear()
    // alert('O programa sera finalizado')
    // return

    const data = {
      cpf,
      produto,
      valorVenda: formatAmount(valorVenda),
      dataVenda
    }
    await spendingCreate(data)
    if (
      parseFloat(cpf) === 1234 ||
      parseFloat(cpf) === 4567 ||
      parseFloat(cpf) === 8912) {
      setCPF('')
      setProduto('')
      setValorVenda('')
      setDataVenda('')
      const result = await spendingGetAll()
      console.log(result)
    } else {
      Alert.alert('ATENÇÃO', 'O CPF digitado é invalido!')
    }
  }

  return (
    <Container
    >
      <Header title='Cadastro' />

      <Input
        placeholder='CPF:'
        placeholderTextColor='#363F5F'
        value={cpf}
        onChangeText={value => setCPF(value)}
      />

      <Input
        placeholder='Produto'
        placeholderTextColor='#363F5F'
        value={produto}
        onChangeText={value => setProduto(value)}
      />

      {/* <Input
        placeholder='Código do Imposto'
        placeholderTextColor='#363F5F'
        value={codigoImposto}
        onChangeText={value => setCodigoImposto(value)}
      /> */}

      <InputAmount
        placeholder='Valor da venda'
        placeholderTextColor='#363F5F'
        value={valorVenda}
        onChangeText={value => setValorVenda(value)}
      />

      {/* <Input
        placeholder='Fornecedor'
        placeholderTextColor='#363F5F'
        value={fornecedor}
        onChangeText={value => setFornecedor(value)}
      /> */}

      <InputDate
        placeholder='Data'
        placeholderTextColor='#363F5F'
        value={dataVenda}
        onChangeText={value => setDataVenda(value)}
      />

      <Button
        title='Adicionar'
        onPress={handleAddNewSpending}
      />

    </Container>
  )
}