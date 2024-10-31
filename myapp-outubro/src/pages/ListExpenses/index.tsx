import { useState, useEffect, useCallback }
  from 'react'
import { useFocusEffect }
  from '@react-navigation/native'

import { Header } from '../../components/Header'

import { FlatList } from 'react-native'

import { Container, Transactions } from './styles'

import { TransactionExpenses } from '../../components/TransactionExpenses'

import { spendingGetAll } from '../../storage/spending/spendingGetAll'
import { SpendingStorageDTO } from '../../storage/spending/SpendingStorageDTO'

export function ListExpenses() {

  const [dataExpenses, setListExpenses] =
    useState<SpendingStorageDTO[]>([])

  async function loadDataSpending() {
    const data = await spendingGetAll()
    console.log('Dados gravados: ', data)
    setListExpenses(data)
  }

  // useEffect(() => {
  //   loadDataSpending()
  // }, [])

  useFocusEffect(useCallback(() => {
    loadDataSpending()
  }, []))

  return (
    <Container>
      <Header title='Listagem de Gastos' />

      <Transactions>
        <FlatList
          data={dataExpenses}
          renderItem={({ item }) =>
            <TransactionExpenses data={item} />
          }
          showsVerticalScrollIndicator={false}
        />

      </Transactions>

    </Container>
  )
}
