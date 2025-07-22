import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  location: yup.string().required("Location is required"),
  code: yup.string().required("Code is required"),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  defaultValues?: Partial<FormData>;
}

export default function BranchForm({ open, onClose, onSubmit, defaultValues }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(defaultValues || { name: "", location: "", code: "" });
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{defaultValues ? "Edit" : "Add"} Branch</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField fullWidth label="Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} margin="normal" />
          <TextField fullWidth label="Location" {...register("location")} error={!!errors.location} helperText={errors.location?.message} margin="normal" />
          <TextField fullWidth label="Code" {...register("code")} error={!!errors.code} helperText={errors.code?.message} margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">{defaultValues ? "Update" : "Create"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
