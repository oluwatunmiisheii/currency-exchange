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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string | number,
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  pattern?: string,
}