import { useMemo } from "react";
import { Task } from "../dashboard.types";
import { Task as TaskComponent } from "./task";

const GroupLabels: Record<number, string> = {
  0: 'To Do',
  1: 'Done'
};

const renderTasks = (tasks: Task[], onDelete: (id: number) => void) => {
  return tasks.map(it => (
    <TaskComponent title={it.description} id={it.id} key={it.id} onDelete={onDelete} />
  ))
}

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void, 
}

export const TaskGroups = ({ tasks, onDelete }: Props) => {

  const tasksPerGroup = useMemo(() => {
    return tasks.reduce<Record<string, Task[]>>((acc, it) => {
      if(!GroupLabels[it.status]) return acc;

      const title = GroupLabels[it.status];

      if (!acc[title]) return { ...acc, [title]: [it] };
      return { ...acc, [title]: [...acc[title], it] }
    }, {});
  }, [tasks]);

  const EmptyState = () => <span>No tasks available yet...</span>;

  if(!tasks.length) return <EmptyState />;

  return (
    <div>
      {
        Object.entries(tasksPerGroup).map(([title, tasks]) => (
          <>
            <h3>{title}</h3>
            {renderTasks(tasks, onDelete)}
          </>
        ))}
    </div>
  );
}