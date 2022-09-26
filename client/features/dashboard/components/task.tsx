import { Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  title: string;
}

export const Task = ({ title }: Props) => (
  <div className="item">
    <input type="checkbox" id={ title }/>
    <Tooltip title="Will ends at...">
      <label htmlFor={title}>{title}</label>
    </Tooltip>
    <span>
    <Tooltip title="Remove Task">
      <DeleteIcon />
    </Tooltip>
    </span>
  </div>
)