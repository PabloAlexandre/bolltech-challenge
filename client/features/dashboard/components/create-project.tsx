import { FormEvent } from "react";
import { Input } from "../../../components"
import { useForm } from "../../../hooks/useForm"

interface Props {
  onCreate: (project: any) => void
  isLoading: boolean;
}
export const CreateProject = ({
  onCreate,
  isLoading
}: Props) => {
  const { getValue, setValue, resetValues } = useForm();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetValues();
    onCreate(getValue('project'));
  }
  
  return (
    <section className="create-project">
      <h2>Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <Input name="project" placeholder="Project name" onChange={setValue("project")} value={getValue("project")} />
        <button className="button blue" disabled={isLoading}>Create Project</button>
      </form>
    </section>
  )
}