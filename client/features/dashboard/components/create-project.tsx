import { FormEvent } from "react";
import { Input } from "../../../components"
import { useForm } from "../../../hooks/useForm"

export const CreateProject = () => {
  const { getValue, setValue, resetValues } = useForm();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert(getValue('project'));
    resetValues();
  }
  
  return (
    <section className="create-project">
      <h2>Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <Input name="project" placeholder="Project name" onChange={setValue("project")} value={getValue("project")} />
        <button className="button blue">Create Project</button>
      </form>
    </section>
  )
}