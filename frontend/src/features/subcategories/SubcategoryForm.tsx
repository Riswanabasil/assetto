
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import type { IAssetSubcategory, IAssetCategory } from "../../types/asset";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import {
  createSubcategory,
  updateSubcategory,
} from "../../services/SubCategoryService";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  categoryId: yup.string().required("Category is required"),
});

type FormData = {
  name: string;
  description?: string;
  categoryId: string;
};

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  fetchSubcategories: () => void;
  editData: IAssetSubcategory | null;
  categories: IAssetCategory[];
}

export default function SubcategoryForm({
  open,
  setOpen,
  fetchSubcategories,
  editData,
  categories,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name,
        description: editData.description,
        categoryId:
          typeof editData.categoryId === "string"
            ? editData.categoryId
            : editData.categoryId._id,
      });
    } else {
      reset({ name: "", description: "", categoryId: "" });
    }
  }, [editData, reset]);

  const onSubmit = async (data: FormData) => {
    if (editData) {
      await updateSubcategory(editData._id, data);
    } else {
      await createSubcategory(data);
    }
    fetchSubcategories();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>{editData ? "Edit" : "Add"} Subcategory</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="space-y-4">
          <TextField
            fullWidth
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Description"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            fullWidth
            select
            label="Category"
            {...register("categoryId")}
            error={!!errors.categoryId}
            helperText={errors.categoryId?.message}
          >
            <MenuItem value="">-- Select --</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" variant="contained">
            {editData ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
