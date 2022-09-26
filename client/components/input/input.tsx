import { ChangeEvent } from "react"

interface Props {
  value: string | number;
  type: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  error?: string;
}

export const Input = ({ value, type = 'text', name, onChange, placeholder, label, error }: Props) => {
  return (
    <>
      {label && <label htmlFor={name}>{ label } </label> }
      <input className="input" type={type} onChange={onChange} value={value} placeholder={placeholder} name={name} required />
      {error && <span>{error}</span>}
    </>
  )
}