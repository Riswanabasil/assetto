import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getAllBranches,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../../services/BranchService";
import BranchForm from "./BranchForm";
import type { IBranch } from "../../types/branch";import { Pencil, Trash2 } from "lucide-react";
export default function BranchListPage() {
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<IBranch | null>(null);

  const fetchBranches = async () => {
    const data = await getAllBranches();
    setBranches(data);
  };

  const handleCreate = async (data: Partial<IBranch>) => {
    if (editData) {
      await updateBranch(editData._id!, data);
    } else {
      await createBranch(data);
    }
    setOpen(false);
    setEditData(null);
    fetchBranches();
  };

  const handleDelete = async (id: string) => {
    await deleteBranch(id);
    fetchBranches();
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <Paper className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">Branch Management</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
        >
          Add Branch
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {branches.map((b) => (
            <TableRow key={b._id}>
              <TableCell>{b.name}</TableCell>
              <TableCell>{b.location}</TableCell>
              <TableCell>{b.code}</TableCell>
              {/* <TableCell>
                <Button size="small" onClick={() => { setEditData(b); setOpen(true); }}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(b._id!)}>Delete</Button>
              </TableCell> */}

              <TableCell className="px-6 py-3 flex gap-3">
                <button
                  onClick={() => {
                    setEditData(b);
                    setOpen(true);
                  }}
                  className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(b._id!)}
                  className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <BranchForm
        open={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        onSubmit={handleCreate}
        defaultValues={editData || undefined}
      />
    </Paper>
  );
}
