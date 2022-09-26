import { useMemo } from "react";
import { Task } from "../dashboard.types";
import { Task as TaskComponent } from "./task";

const GroupLabels: Record<number, string> = {
  0: 'To Do',
  1: 'Done'
};

interface RenderTaskOptions {
  onDelete: (id: number) => void
  onFinish: (id: number) => void
  onEdit: (id: number) => void
}

const renderTasks = (tasks: Task[], { onDelete, onFinish, onEdit }: RenderTaskOptions) => {
  return tasks.map(it => (
    <TaskComponent
      title={it.description} 
      id={it.id} 
      key={it.id} 
      onDelete={onDelete} 
      onEdit={onEdit}
      checked={(it.status === 1)} 
      onCheckChange={() => onFinish(it.id)} 
      createdAt={it.createdAt}
    />
  ))
}

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void,
  onFinish: (id: number) => void
  onEdit: (id: number) => void
}

export const TaskGroups = ({ tasks, onDelete, onFinish, onEdit }: Props) => {

  const tasksPerGroup = useMemo(() => {
    return tasks.reduce<Record<string, Task[]>>((acc, it) => {
      if (!GroupLabels[it.status]) return acc;

      const title = GroupLabels[it.status];
      return { ...acc, [title]: [...acc[title], it] }
    }, { 'To Do': [], 'Done': [] });
  }, [tasks]);

  const EmptyState = () => <span>No tasks available yet...</span>;

  if (!tasks.length) return <EmptyState />;

  return (
    <div>
      {
        Object.entries(tasksPerGroup).map(([title, tasks]) => (
          <>
            <h3>{title}</h3>
            {renderTasks(tasks, {onDelete, onFinish, onEdit})}
          </>
        ))}
    </div>
  );
}