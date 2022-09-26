import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { Input } from '../../../components';
import { useForm } from '../../../hooks/useForm';

interface Props {
  name: string;
}

export const Project = ({
  name,
}: Props) => {
  const { getValue, setValue, resetValues } = useForm();

  return (
    <div className="card">
      <header>
        <span>Project {name}</span>
        <div className="actions">
          <Tooltip title="Edit Project">
            <EditIcon  />
          </Tooltip>
          <Tooltip title="Remove Project">
            <DeleteIcon />
          </Tooltip>
        </div>
      </header>
      <main>

      </main>
      <footer>
        <Input name="task" onChange={setValue('task')} value={getValue('task')} /> 
        <button className="button green min">Add</button>
      </footer>
    </div>
  )

}