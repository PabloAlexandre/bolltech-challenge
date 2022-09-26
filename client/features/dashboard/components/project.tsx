import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { FormEvent, useState } from 'react';
import { Input } from '../../../components';
import { useForm } from '../../../hooks/useForm';
import { Task } from './task';

interface Props {
  name: string;
}

export const Project = ({
  name,
}: Props) => {
  const { getValue, setValue, resetValues } = useForm();

  const [tasks, setTasks] = useState([{
    title: 'Lavar a louca'
  }]);

  const EmptyState = () => <span>No tasks available yet...</span>;
  const TasksState = () => <>
    {
      tasks.map(it => (
        <Task title={it.title}/>
      ))
    }
  </>;

  const contentState = !tasks.length ? <EmptyState /> : <TasksState />

  function addTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTasks([...tasks, { title: getValue('task').toString() }]);
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
          <Tooltip title="Remove Project">
            <DeleteIcon />
          </Tooltip>
        </div>
      </header>
      <main>
        { contentState }
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