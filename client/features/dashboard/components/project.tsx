import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  name: string;
}

export const Project = ({
  name,
}: Props) => {

  return (
    <div className="card">
      <header>
        <span>Project {name}</span>
        <div className="actions">
          <EditIcon />
          <DeleteIcon />
        </div>
      </header>
    </div>
  )

}