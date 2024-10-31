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

  const [notaFiscal, setNotaFiscal] = useState('')
  const [produto, setProduto] = useState('')
  const [codigoImposto, setCodigoImposto] = useState('')
  const [valorImposto, setValorImposto] = useState('')
  const [fornecedor, setFornecedor] = useState('')
  const [dataNotaFiscal, setDataNotaFiscal] = useState('')

  async function handleAddNewSpending() {

    // await AsyncStorage.clear()
    // alert('O programa sera finalizado')
    // return

    const data = {
      notaFiscal,
      produto,
      codigoImposto: parseFloat(codigoImposto),
      valorImposto: formatAmount(valorImposto),
      fornecedor,
      dataNotaFiscal
    }
    await spendingCreate(data)
    if (
      parseFloat(codigoImposto) === 1708 ||
      parseFloat(codigoImposto) === 3770 ||
      parseFloat(codigoImposto) === 3746) {
      setNotaFiscal('')
      setProduto('')
      setCodigoImposto('')
      setValorImposto('')
      setFornecedor('')
      setDataNotaFiscal('')
      const result = await spendingGetAll()
      console.log(result)
    } else {
      Alert.alert('ATENÇÃO', 'O código de imposto inserido é inválido!')
    }
  }

  return (
    <Container
    >
      <Header title='Cadastro' />

      <Input
        placeholder='Nota Fiscal'
        placeholderTextColor='#363F5F'
        value={notaFiscal}
        onChangeText={value => setNotaFiscal(value)}
      />

      <Input
        placeholder='Produto'
        placeholderTextColor='#363F5F'
        value={produto}
        onChangeText={value => setProduto(value)}
      />

      <Input
        placeholder='Código do Imposto'
        placeholderTextColor='#363F5F'
        value={codigoImposto}
        onChangeText={value => setCodigoImposto(value)}
      />

      <InputAmount
        placeholder='Valor do Imposto'
        placeholderTextColor='#363F5F'
        value={valorImposto}
        onChangeText={value => setValorImposto(value)}
      />

      <Input
        placeholder='Fornecedor'
        placeholderTextColor='#363F5F'
        value={fornecedor}
        onChangeText={value => setFornecedor(value)}
      />

      <InputDate
        placeholder='Data'
        placeholderTextColor='#363F5F'
        value={dataNotaFiscal}
        onChangeText={value => setDataNotaFiscal(value)}
      />

      <Button
        title='Adicionar'
        onPress={handleAddNewSpending}
      />

    </Container>
  )
}