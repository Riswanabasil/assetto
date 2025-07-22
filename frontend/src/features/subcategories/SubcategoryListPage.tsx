import { useEffect, useState } from "react";
import {
  getAllSubcategories,
  deleteSubcategory,
  getAllCategories,
} from "../../services/SubCategoryService";
import type { IAssetCategory, IAssetSubcategory } from "../../types/asset";
import SubcategoryForm from "./SubcategoryForm";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";

export default function SubcategoryListPage() {
  const [subcategories, setSubcategories] = useState<IAssetSubcategory[]>([]);
  const [categories, setCategories] = useState<IAssetCategory[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<IAssetSubcategory | null>(null);

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  const fetchSubcategories = async () => {
    const data = await getAllSubcategories();
    setSubcategories(data);
  };

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const handleEdit = (subcategory: IAssetSubcategory) => {
    setEditData(subcategory);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure to delete this subcategory?")) {
      await deleteSubcategory(id);
      fetchSubcategories();
    }
  };

  return (
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Subcategories</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
        >
          + Add Subcategory
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subcategories.map((sub) => (
              <TableRow key={sub._id}>
                <TableCell>{sub.name}</TableCell>
                <TableCell>{sub.description}</TableCell>
                <TableCell>
                  {sub.categoryId &&
                  typeof sub.categoryId === "object" &&
                  "name" in sub.categoryId
                    ? sub.categoryId.name
                    : "-"}
                </TableCell>
                {/* <TableCell>
                  <Button size="small" onClick={() => handleEdit(sub)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(sub._id)}
                  >
                    Delete
                  </Button>
                </TableCell> */}

                <TableCell className="px-6 py-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(sub)}
                    className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(sub._id)}
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
      </Paper>

      <SubcategoryForm
        open={open}
        setOpen={setOpen}
        fetchSubcategories={fetchSubcategories}
        editData={editData}
        categories={categories}
      />
    </Box>
  );
}
