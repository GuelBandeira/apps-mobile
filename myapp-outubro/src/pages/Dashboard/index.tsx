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
export function Dashboard() {

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [datePurchase, setDatePurchase] = useState('')
  const [category, setCategory] = useState('')
  const [local, setLocal] = useState('')

  async function handleAddNewSpending() {

    // limpa o AsyncStorage no ios
    // AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
    // alert('O programa sera finalizado')
    // return

    // limpa o AsyncStorage no android
    // await AsyncStorage.clear()
    // alert('O programa sera finalizado')
    // return

    const data = {
      name,
      amount: formatAmount(amount),
      datePurchase,
      category,
      local
    }
    await spendingCreate(data)
    setName('')
    setAmount('')
    setDatePurchase('')
    setCategory('')
    setLocal('')
    const result = await spendingGetAll()
    console.log(result)

  }

  return (
    <Container
    >
      <Header title='Controle de Gastos' />

      <Input
        placeholder='Descrição'
        placeholderTextColor='#363F5F'
        value={name}
        onChangeText={value => setName(value)}
      />

      <InputAmount
        placeholder='Valor'
        placeholderTextColor='#363F5F'
        value={amount}
        onChangeText={value => setAmount(value)}
      />

      <InputDate
        placeholder='Data Compra'
        placeholderTextColor='#363F5F'
        value={datePurchase}
        onChangeText={value => setDatePurchase(value)}
      />

      <Input
        placeholder='Categoria'
        placeholderTextColor='#363F5F'
        value={category}
        onChangeText={value => setCategory(value)}
      />

      <Input
        placeholder='Local da Compra'
        placeholderTextColor='#363F5F'
        value={local}
        onChangeText={value => setLocal(value)}
      />

      <Button
        title='Adicionar'
        onPress={handleAddNewSpending}
      />

    </Container>
  )
}