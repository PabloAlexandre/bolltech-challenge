import { Container, Input } from "../components";
import { useForm } from "../hooks/useForm";
import Link from "next/link";
import { FormEvent } from "react";
import { saveUserCredentials } from "../utils/Auth";
import { APIClient } from "../utils/APIClient";
import { useRouter } from "next/router";

export default function SignUpPage() {
  const router = useRouter();
  const { formState, getValue, setValue } = useForm();


  const handleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    APIClient.post('/users', formState)
      .then(({ data }) => {
        saveUserCredentials(data.accessToken);
        router.push('/');
      })
      .catch(() => alert('Invalid email or password, please try again'));
  }

  return (
    <Container>
      <form className="login" onSubmit={handleSignupSubmit}>
        <h1 className="title">Sign up</h1>
        
        <Input name="name" type="text" value={getValue('name')} onChange={setValue('name')} label="Name" />
        <Input name="email" type="email" value={getValue('email')} onChange={setValue('email')} label="Email" />
        <Input name="password" type="password" value={getValue('password')} onChange={setValue('password')} label="Password" />

        <button type="submit" className="button">Login</button>
        <Link href="login">
          <span className="auth-link">
          Enter in your account
          </span>
        </Link>
      </form>
     
    </Container>
  )
}