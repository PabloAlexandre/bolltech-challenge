import { FormEvent } from "react";
import { Container, Input } from "../components";
import { useForm } from "../hooks/useForm";
import { APIClient } from "../utils/APIClient";
import { saveUserCredentials } from '../utils/Auth';
import Link
 from "next/link";
import { useRouter } from "next/router";
export default function LoginPage() {
  const router = useRouter();
  const { formState, getValue, setValue } = useForm();

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    APIClient.post('/login', formState)
      .then(({ data }) => {
        saveUserCredentials(data.accessToken);
        router.push('/');
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
        <Link href="signup">
          <span className="auth-link">
          Create your account
          </span>
        </Link>
      </form>
     
    </Container>
  )
}