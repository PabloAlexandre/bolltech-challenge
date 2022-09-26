import { Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { ChangeEvent } from "react";

interface Props {
  id: number;
  title: string;
  checked?: boolean;
  createdAt: string;
  onCheckChange: (e: ChangeEvent<HTMLInputElement>) => void
  onDelete: (id: number) => void
}

export const Task = ({ title, id, onDelete, checked = false, onCheckChange, createdAt }: Props) => (
  <div className="item">
    <input type="checkbox" id={ title } onChange={onCheckChange} checked={checked} disabled={checked} />
    <Tooltip title={`Created at ${createdAt}`}>
      <label htmlFor={title}>{title}</label>
    </Tooltip>
    <span className="actions">
      {
        !checked && (
          <>
            <Tooltip title="Edit Task">
              <EditIcon />
            </Tooltip>
            <Tooltip title="Remove Task">
              <DeleteIcon onClick={() => onDelete(id)}/>
            </Tooltip>
          </>
        )
      }
    </span>
  </div>
)