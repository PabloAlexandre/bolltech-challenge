import { useEffect, useState } from "react";
import { APIClient } from "../../utils/APIClient";
import { CreateProject } from "./components/create-project";
import { Project } from "./components/project";

interface Projects {
  id: number;
  name: string;
}

export const Dashboard = () => {
  const [ projects, setProjects ] = useState<Projects[]>([]);
  const [ isLoading, setLoading ] = useState(false);

  useEffect(() => {
    APIClient.get('/projects')
      .then(({ data }) => setProjects(data));
  }, []);

  const onAddProject = (project: string) => {
    setLoading(true);

    APIClient.post('/projects', { name: project })
      .then(({ data }) => setProjects([...projects, data]))
      .finally(() => setLoading(false));
  }

  const onDeleteProject = (id: number) => {
    APIClient.delete(`/projects/${id}`)
      .then(() => setProjects(projects.filter(it => it.id !== id)));
  }

  return (
    <main className="dashboard">
      <section className="projects">
        { projects.map(it => <Project id={it.id} name={it.name} onDelete={onDeleteProject} />)}
      </section>
      <CreateProject onCreate={onAddProject} isLoading={isLoading} />
    </main>
  );
}