import { useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { IVendor } from "../../types/vendor";


const schema = yup.object({
  name: yup.string().required("Name is required"),
  
});


type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IVendor) => void;
  editData?: IVendor | null;
};

export default function VendorForm({ open, onClose, onSubmit, editData }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IVendor>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editData) reset(editData);
    else reset({});
  }, [editData, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editData ? "Edit" : "Add"} Vendor</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="space-y-3">
          <TextField fullWidth label="Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
          <TextField fullWidth label="Contact Person" {...register("contactPerson")} />
          <TextField fullWidth label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
          <TextField fullWidth label="Phone" {...register("phone")} />
          <TextField fullWidth label="Address" {...register("address")} />
          <TextField fullWidth label="GST Number" {...register("gstNumber")} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">{editData ? "Update" : "Add"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
