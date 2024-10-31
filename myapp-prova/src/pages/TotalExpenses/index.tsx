import { useCallback, useState } from 'react'
import { Header } from '../../components/Header'
import { Container, P, Transactions, Espaco } from './styles'
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

    const codigosCliente = ['']
    codigosCliente.pop();
    data.forEach(obj => {
      if (obj.codigoCliente && (
        (obj.codigoCliente) === '001394' ||
        (obj.codigoCliente) === '007788' ||
        (obj.codigoCliente) === '001020' ||
        (obj.codigoCliente) === '003040'
      )) {

        if (obj.codigoCliente == '001020' || obj.codigoCliente == '003040') {
          obj.codigoCliente = '001020+003040';
        }


        // if (obj.codigoCliente == '001394' || obj.codigoCliente == '007788') {
        //   obj.codigoCliente = '001394+007788';
        // }

        if (codigosCliente.indexOf(`${obj.codigoCliente}`) == -1) {
          codigosCliente.push(`${obj.codigoCliente}`);
        }
      }
    });

    console.log(codigosCliente);
    // const fornecedores = data
    // .filter(item => (item.fornecedor))
    // console.log(fornecedores);
    codigosCliente.forEach(codigoCliente => {

      var valorTotal = 0;
      var qtd = 0;

      var codigoClienteSeparado = codigoCliente.split("+");
      // var comissao = 0;
      // var salarioComissao = 0;
      // var inss = 0;
      // var salarioLiquido = 0;
      // var salario = 1300;
      data.forEach(obj => {

        //  const valorTotal = tax
        //    .filter(data => data.shipper.toLowerCase() == fornecedor.toLowerCase() && (data.country.toLowerCase() == estado.toLowerCase()))
        //    .reduce((total, obj) => total += obj.valueNF, 0)

        if ((codigoClienteSeparado[0] == '001020' && codigoClienteSeparado[1] == '003040') && codigoCliente == obj.codigoCliente) {
          valorTotal += obj.valorImposto + obj.valorVeiculo;
          qtd++;
        }
        else if (codigoCliente == obj.codigoCliente) {
          valorTotal += obj.valorImposto + obj.valorVeiculo;
          qtd++;
        }
      })

      // if (valorTotal < 100000) {
      //   comissao = valorTotal * 0.01;
      // } else if (valorTotal >= 100000 && valorTotal < 200000) {
      //   comissao = valorTotal * 0.02;
      // } else if (valorTotal >= 200000 && valorTotal < 300000) {
      //   comissao = valorTotal * 0.03;
      // } else if (valorTotal >= 300000) {
      //   comissao = valorTotal * 0.05;
      // }

      // salarioComissao = salario + comissao;
      // inss = (salarioComissao * 0.08);
      // salarioLiquido = salario + comissao - inss;

      const dataObject = {
        codigoCliente,
        valorTotal,
        qtd,

      }
      totals.push(dataObject)
    })
    console.log(totals);

    setTotalImposto(totals);
    // console.log(totals)

    // total por cod


    //  const newData = data
    //    .filter(item => (item.fornecedor == (pesquisa)) || (item.codigoImposto === parseInt(pesquisa)))

    //  function sumMoney(total: number, item: SpendingStorageDTO) {
    //    return total + (item.valorVenda)
    //  }''

    //  const soma = newData
    //    .filter(item => item.valorVenda)
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
            <>
              <P>{`Codigo Cliente: ${item.codigoCliente}`}</P>
              <P>{`Total: ${item.valorTotal.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}</P>
              <P>{`Qtd.: ${item.qtd}`}</P>
              {/* <P>{`Comissão: ${item.comissao.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}</P>
              <P>{`Salário + Comissão: ${item.salarioComissao.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}</P>
              <P>{`INSS: ${item.inss.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}</P>
              <P>{`Salário Líquido: ${item.salarioLiquido.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}</P> */}
              <Espaco></Espaco>
            </>
          }
        />
      </Transactions>

    </Container>
  )
}

