import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { FormEvent, useState } from 'react';
import { Input } from '../../../components';
import { useForm } from '../../../hooks/useForm';
import { TaskGroups } from './task-groups';

interface Props {
  id: number;
  name: string;
  onDelete: (id: number) => void
}

export const Project = ({
  id,
  name,
  onDelete
}: Props) => {
  const { getValue, setValue, resetValues } = useForm();

  const [tasks, setTasks] = useState([{
    title: 'Lavar a louca',
    status: 0
  }]);
  

  function addTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTasks([...tasks, { title: getValue('task').toString(), status: 0 }]);
    resetValues();
  }

  return (
    <div className="card">
      <header>
        <span>Project {name}</span>
        <div className="actions">
          <Tooltip title="Edit Project">
            <EditIcon />
          </Tooltip>
          <Tooltip title="Remove Project" >
            <DeleteIcon onClick={() => onDelete(id)}/>
          </Tooltip>
        </div>
      </header>
      <main>
        <TaskGroups tasks={tasks} />
      </main>
      <footer>
        <form onSubmit={addTask}>
          <Input name="task" onChange={setValue('task')} value={getValue('task')} placeholder="Task" />
          <button className="button green min">Add</button>
        </form>
      </footer>
    </div>
  )

}