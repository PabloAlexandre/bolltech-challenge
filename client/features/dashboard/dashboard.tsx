import { useEffect, useState } from "react";
import { Dialog } from "../../components/layout/dialog";
import { APIClient } from "../../utils/APIClient";
import { CreateProject } from "./components/create-project";
import { Project } from "./components/project";

interface Projects {
  id: number;
  name: string;
}

export const Dashboard = () => {
  const [ projects, setProjects ] = useState<Projects[]>([]);
  const [editingProject, setEditingProject] = useState<Projects>();

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

  const onEditProject = (id: number) => {
    setEditingProject(projects.find(it => it.id === id));
  }

  const updateProject = (project: Projects) => {
    APIClient.put(`/projects/${project.id}`, project)
      .then(({ data }) => setProjects(projects.map(it => {
        if(it.id === project.id) return data;

        return it;
      }))).finally(() => setEditingProject(undefined));
  }

  return (
    <main className="dashboard">
      <section className="projects">
        { projects.map(it => <Project id={it.id} name={it.name} onDelete={onDeleteProject} onEdit={onEditProject} />)}
      </section>
      <CreateProject onCreate={onAddProject} isLoading={isLoading} />

      
      <Dialog 
        opened={!!editingProject} 
        title="Edit Project" 
        description="" 
        initialValue={editingProject?.name || ""} 
        onClose={() => setEditingProject(undefined)}
        onConfirm={(value) => updateProject({ ...editingProject, name: value } as Projects)}
      />
    </main>
  );
}