import { ChangeEvent, useState } from "react";

export function useForm(initialValues = {}) {
  const [ formState, setFormState ] = useState<Record<string, string | number>>(initialValues);

  function getValue(name: string) {
    return formState[name];
  }

  function setValue(name: string) {
    return function(e: ChangeEvent<HTMLInputElement>) {
      setFormState({ ...formState, [name]: e.target.value });
    }
  }
  
  return {
    formState,
    getValue,
    setValue,
  }
}