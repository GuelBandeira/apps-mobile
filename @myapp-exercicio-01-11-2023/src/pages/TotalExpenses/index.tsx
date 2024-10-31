import { useCallback, useState } from 'react'
import { Header } from '../../components/Header'
import { Container, P, Transactions } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Alert } from 'react-native'
import { spendingGetAll } from '../../storage/spending/spendingGetAll'
import { SpendingStorageDTO } from '../../storage/spending/SpendingStorageDTO'
import { TransactionExpenses } from '../../components/TransactionExpenses'
import { FlatList } from 'react-native'
import { TotalsDTO } from '../../storage/TotalsDTO'
import { useFocusEffect } from '@react-navigation/native'

export function TotalExpenses() {
  const [dataExpense, setDataExpense] = useState<SpendingStorageDTO[]>([]);
  const [somaFornecedor, setSomaFornecedor] = useState(0)
  const [TotalImposto, setTotalImposto] = useState<TotalsDTO[]>([]);

  async function TotalInvoice() {


    const data = await spendingGetAll()

      // total por região
      const totals: TotalsDTO[] = []
      // const cods = ['1234', '6789']
      
      const codigoImpostos = ['']
      codigoImpostos.pop();
      data.forEach(obj => {
         if (obj.codigoImposto && (
         (obj.codigoImposto) === 1708 ||
         (obj.codigoImposto) === 3770 ||
         (obj.codigoImposto) === 3746) && codigoImpostos.indexOf(`${obj.codigoImposto}`) == -1){
            codigoImpostos.push(`${obj.codigoImposto}`);
         }
       });

       console.log(codigoImpostos);
      // const fornecedores = data
      // .filter(item => (item.fornecedor))
      // console.log(fornecedores);
      codigoImpostos.forEach(codigoImposto => {
         
         var qtd_notas = 0;
         var valorTotal = 0;
               data.forEach(obj => {
         
         //  const valorTotal = tax
         //    .filter(data => data.shipper.toLowerCase() == fornecedor.toLowerCase() && (data.country.toLowerCase() == estado.toLowerCase()))
         //    .reduce((total, obj) => total += obj.valueNF, 0)


         if (parseFloat(codigoImposto) == obj.codigoImposto){
            qtd_notas++;
            valorTotal += obj.valorImposto;
         }
  
   
      })
      const dataObject = {
         codigoImposto,
         qtd_notas,
         valorTotal,
       }
       totals.push(dataObject)
   })

   setTotalImposto(totals);
   // console.log(totals)
  
      // total por cod


   //  const newData = data
   //    .filter(item => (item.fornecedor == (pesquisa)) || (item.codigoImposto === parseInt(pesquisa)))

   //  function sumMoney(total: number, item: SpendingStorageDTO) {
   //    return total + (item.valorImposto)
   //  }''

   //  const soma = newData
   //    .filter(item => item.valorImposto)
   //    .reduce(sumMoney, 0)

   //  setSomaFornecedor(soma)
   //  setDataExpense(newData)
  }

  useFocusEffect(useCallback(() => {
   TotalInvoice()
  }, []))

  return (
    <Container>
      <Header title='Total por imposto' />
{/* 
      <Input
        placeholder='Codigo do Imposto'
        placeholderTextColor='#363F5F'
        value={pesquisa}
        onChangeText={value => setPesquisa(value)}
      /> */}

      {/* <Button
        onPress={handleSearchSpending}
        title='Atualizar Total'
      /> */}

  

      <Transactions>
        <FlatList
          data={TotalImposto}
          renderItem={({ item }) =>
            <P>{`${item.codigoImposto} - ${item.valorTotal.toLocaleString('pt-br', {minimumFractionDigits: 2})} - ${item.qtd_notas}`}</P>
          }
        />
      </Transactions>

    </Container>
  )
}

