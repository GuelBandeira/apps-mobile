import { useState } from 'react'
import { Header } from '../../components/Header'
import { Container } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

export function SearchExpenses() {
  const [category, setCategory] = useState('')

  return (
    <Container>
      <Header title='Pesquisa Gastos' />

      <Input
        placeholder='Categoria'
        placeholderTextColor='#363F5F'
        value={category}
        onChangeText={value => setCategory(value)}
      />

      <Button
        title='Pesquisa'
      />

    </Container>
  )
}

