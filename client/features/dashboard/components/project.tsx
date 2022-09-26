import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { FormEvent, useEffect, useState } from 'react';
import { Input } from '../../../components';
import { useForm } from '../../../hooks/useForm';
import { APIClient } from '../../../utils/APIClient';
import { Task } from '../dashboard.types';
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

  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    APIClient.get(`/projects/${id}/tasks`)
      .then(({ data }) => setTasks(data));
  }, []);

  function addTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    APIClient.post(`/projects/${id}/tasks`, { 
      description: getValue('task')
    })
    .then(({ data }) => {
      setTasks([...tasks, data]);
    });
    resetValues();
  }

  function deleteTask(taskId: number) {
    APIClient.delete(`/projects/${id}/tasks/${taskId}`)
      .then(() => setTasks(tasks.filter(it => it.id !== taskId)));
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
        <TaskGroups tasks={tasks} onDelete={deleteTask} />
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