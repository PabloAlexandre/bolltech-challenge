import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { FormEvent, useEffect, useState } from 'react';
import { Input } from '../../../components';
import { Dialog } from '../../../components/layout/dialog';
import { useForm } from '../../../hooks/useForm';
import { APIClient } from '../../../utils/APIClient';
import { Task } from '../dashboard.types';
import { TaskGroups } from './task-groups';

interface Props {
  id: number;
  name: string;
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

export const Project = ({
  id,
  name,
  onEdit,
  onDelete
}: Props) => {
  const { getValue, setValue, resetValues } = useForm();

  const [editingTask, setEditingTask] = useState<Task>();
  
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

  function finishTask(taskId: number) {
    APIClient.post(`/projects/${id}/tasks/${taskId}/finish`)
      .then(({ data }) => setTasks(
        tasks.map(it => {
          if(it.id === taskId) return data;
          return it; 
        })
      ));
  }

  const onEditTask = (id: number) => {
    setEditingTask(tasks.find(it => it.id === id));
  }

  const updateTask = (task: Task) => {
    APIClient.put(`/projects/${id}/tasks/${task.id}`, task)
      .then(({ data }) => setTasks(tasks.map(it => {
        if(it.id === task.id) return data;

        return it;
      }))).finally(() => setEditingTask(undefined));
  }


  return (
    <div className="card">
      <header>
        <span>Project {name}</span>
        <div className="actions">
          <Tooltip title="Edit Project">
            <EditIcon onClick={() => onEdit(id)}/>
          </Tooltip>
          <Tooltip title="Remove Project" >
            <DeleteIcon onClick={() => onDelete(id)}/>
          </Tooltip>
        </div>
      </header>
      <main>
        <TaskGroups tasks={tasks} onDelete={deleteTask} onFinish={finishTask} onEdit={onEditTask} />
      </main>
      <footer>
        <form onSubmit={addTask}>
          <Input name="task" onChange={setValue('task')} value={getValue('task')} placeholder="Task" />
          <button className="button green min">Add</button>
        </form>
      </footer>
      <Dialog
        opened={!!editingTask} 
        title="Edit Task" 
        description="" 
        initialValue={editingTask?.description || ""} 
        onClose={() => setEditingTask(undefined)}
        onConfirm={(value) => updateTask({ ...editingTask, description: value } as Task)}
      />
    </div>
  )

}