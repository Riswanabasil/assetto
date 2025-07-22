import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { IManufacturer } from "../../types/manufacturer";

type FormInput = Omit<IManufacturer, "_id">;

const schema = yup.object({
  name: yup.string().required("Name is required"),
 
});

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormInput) => void;
  editData: IManufacturer | null;
};

export default function ManufacturerForm({ open, onClose, onSubmit, editData }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editData) reset(editData);
    else reset({});
  }, [editData, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editData ? "Edit" : "Add"} Manufacturer</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="space-y-3">
          <TextField fullWidth label="Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
          <TextField fullWidth label="Description" {...register("description")} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">{editData ? "Update" : "Add"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
