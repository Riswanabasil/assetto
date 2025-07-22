import { useEffect, useState } from "react";
import {
  getManufacturers,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
} from "../../services/ManufacturerApi";
import type { IManufacturer } from "../../types/manufacturer";
import ManufacturerForm from "./ManufacturerForm";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import Swal from "sweetalert2";
import { Pencil, Trash2 } from "lucide-react";

export default function ManufacturerListPage() {
  const [manufacturers, setManufacturers] = useState<IManufacturer[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<IManufacturer | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getManufacturers();
    setManufacturers(data);
  };

  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = (data: IManufacturer) => {
    setEditData(data);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    const res = await Swal.fire({
      icon: "warning",
      text: "Delete this manufacturer?",
      showCancelButton: true,
    });
    if (res.isConfirmed) {
      await deleteManufacturer(id);
      loadData();
    }
  };

  const handleSubmit = async (data: Omit<IManufacturer, "_id">) => {
    if (editData) {
      await updateManufacturer(editData._id, data);
    } else {
      await createManufacturer(data);
    }
    setOpen(false);
    loadData();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manufacturers</h2>
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {manufacturers.map((m) => (
            <TableRow key={m._id}>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.description || "-"}</TableCell>
              {/* <TableCell>
                <IconButton onClick={() => handleEdit(m)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDelete(m._id)}><DeleteIcon /></IconButton>
              </TableCell> */}
              <TableCell className="px-6 py-3 flex gap-3">
                <button
                  onClick={() => handleEdit(m)}
                  className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
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

      <ManufacturerForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        editData={editData}
      />
    </div>
  );
}
