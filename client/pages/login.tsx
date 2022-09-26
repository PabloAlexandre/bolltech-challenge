import { FormEvent } from "react";
import { Container, Input } from "../components";
import { useForm } from "../hooks/useForm";
import { APIClient } from "../utils/APIClient";
import { saveUserCredentials } from '../utils/Auth';

export default function LoginPage() {
  const { formState, getValue, setValue } = useForm();

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    APIClient.post('/login', formState)
      .then(({ data }) => {
        saveUserCredentials(data.accessToken);
      })
      .catch(() => alert('Invalid email or password, please check info'));
  }

  return (
    <Container>
      <form className="login" onSubmit={handleLoginSubmit}>
        <h1 className="title">Login</h1>
        <Input name="email" type="email" value={getValue('email')} onChange={setValue('email')} label="Email" />
        <Input name="password" type="password" value={getValue('password')} onChange={setValue('password')} label="Password" />
        <button type="submit" className="button">Login</button>
      </form>
     
    </Container>
  )
}