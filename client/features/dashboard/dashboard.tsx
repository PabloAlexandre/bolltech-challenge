import { useState } from "react";
import { CreateProject } from "./components/create-project";
import { Project } from "./components/project";

export const Dashboard = () => {

  const [ projects, setProjects ] = useState<string[]>([]);

  const onAddProject = (project: string) => {
    setProjects([...projects, project]);
  }

  return (
    <main className="dashboard">
      <section className="projects">
        { projects.map(it => <Project name={it} />)}
      </section>
      <CreateProject onCreate={onAddProject}/>
    </main>
  );
}