import { Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  id: number;
  title: string;
  onDelete: (id: number) => void
}

export const Task = ({ title, id, onDelete }: Props) => (
  <div className="item">
    <input type="checkbox" id={ title }/>
    <Tooltip title="Will ends at...">
      <label htmlFor={title}>{title}</label>
    </Tooltip>
    <span>
    <Tooltip title="Remove Task">
      <DeleteIcon onClick={() => onDelete(id)}/>
    </Tooltip>
    </span>
  </div>
)