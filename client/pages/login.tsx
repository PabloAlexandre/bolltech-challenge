import { Container, Input } from "../components";
import { useForm } from "../hooks/useForm";

export default function LoginPage() {
  const { getValue, setValue } = useForm();

  return (
    <Container>
      <form className="login">
        <h1 className="title">Login</h1>
        <Input name="email" type="email" value={getValue('email')} onChange={setValue('email')} label="Email" />
        <Input name="password" type="password" value={getValue('password')} onChange={setValue('password')} label="Password" />
        <button type="submit" className="button">Login</button>
      </form>
     
    </Container>
  )
}