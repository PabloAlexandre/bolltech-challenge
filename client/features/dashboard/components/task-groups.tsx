import { useMemo } from "react";
import { Task } from "./task";

const GroupLabels: Record<number, string> = {
  0: 'To Do',
  1: 'Done'
};

interface Task {
  title: string;
  status: number;
}

const renderTasks = (tasks: Task[]) => {
  return tasks.map(it => (
    <Task title={it.title} />
  ))
}

interface Props {
  tasks: Task[];
}

export const TaskGroups = ({ tasks }: Props) => {

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
            {renderTasks(tasks)}
          </>
        ))}
    </div>
  );
}