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

  const [codigoCliente, setCodigoCliente] = useState('')
  const [nomeVeiculo, setNomeVeiculo] = useState('')
  const [valorVeiculo, setValorVeiculo] = useState('')
  const [dataVeiculo, setDataVeiculo] = useState('')
  const [corVeiculo, setCorVeiculo] = useState('')

  async function handleAddNewSpending() {
    var valorImposto = (formatAmount(valorVeiculo)) * 0.02;
    // await AsyncStorage.clear()
    // alert('O programa sera finalizado')
    // return

    const data = {
      codigoCliente,
      nomeVeiculo,
      valorVeiculo: formatAmount(valorVeiculo),
      dataVeiculo,
      corVeiculo,
      valorImposto
    }
    await spendingCreate(data)
    if (
      (codigoCliente) === '001394' ||
      (codigoCliente) === '007788' ||
      (codigoCliente) === '001020' ||
      (codigoCliente) === '003040'
    ) {
      setCodigoCliente('')
      setNomeVeiculo('')
      setValorVeiculo('')
      setDataVeiculo('')
      setCorVeiculo('')
      const result = await spendingGetAll()
      console.log(result)
    } else {
      Alert.alert('ATENÇÃO', 'O código do cliente digitado é invalido!')
    }
  }

  return (
    <Container>
      <Header title='Cadastro' />

      <InputDate
        placeholder='Data do veículo'
        placeholderTextColor='#363F5F'
        value={dataVeiculo}
        onChangeText={value => setDataVeiculo(value)}
      />

      <Input
        placeholder='Nome do Veículo'
        placeholderTextColor='#363F5F'
        value={nomeVeiculo}
        onChangeText={value => setNomeVeiculo(value)}
      />

      <Input
        placeholder='Código do Cliente'
        placeholderTextColor='#363F5F'
        value={codigoCliente}
        onChangeText={value => setCodigoCliente(value)}
      />


      <Input
        placeholder='Cor'
        placeholderTextColor='#363F5F'
        value={corVeiculo}
        onChangeText={value => setCorVeiculo(value)}
      />



      {/* <Input
        placeholder='Código do Imposto'
        placeholderTextColor='#363F5F'
        value={codigoClienteImposto}
        onChangeText={value => setCodigoClienteImposto(value)}
      /> */}

      <InputAmount
        placeholder='Valor do veículo'
        placeholderTextColor='#363F5F'
        value={valorVeiculo}
        onChangeText={value => setValorVeiculo(value)}
      />

      {/* <Input
        placeholder='Fornecedor'
        placeholderTextColor='#363F5F'
        value={fornecedor}
        onChangeText={value => setFornecedor(value)}
      /> */}



      <Button
        title='Adicionar'
        onPress={handleAddNewSpending}
      />

    </Container>
  )
}