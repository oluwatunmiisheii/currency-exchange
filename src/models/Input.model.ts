export interface IInput {
  hasLabel?: boolean
  label?: string,
  inputId?: string,
  type: string,
  name: string,
  placeholder?: string,
  disabled?: boolean,
  errorMessage?: string,
  required?: boolean,
  hasError?: boolean,
  onAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string | number,
  pattern?: string,
}