import { TextInputProps } from 'react-native'
import createNumberMask from 'react-native-masked-text';

import {
  Container,
  InputStyle
} from './styles'

type InputProps = TextInputProps



export function InputAmount({ ...rest }: InputProps) {
  
  return (
    <Container>
      <InputStyle
        type={'money'}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
        }}
        {...rest}
      />
    </Container>
  )
}

