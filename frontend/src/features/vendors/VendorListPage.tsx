import { useEffect, useState } from "react";
import {
  Paper, Table, TableHead, TableRow, TableCell, TableBody, Button
} from "@mui/material";
import {
  fetchVendors, createVendor, updateVendor, deleteVendor
} from "../../services/VendorService";
import type { IVendor } from "../../types/vendor";
import VendorForm from "./VendorForm";
type VendorFormInput = Omit<IVendor, "_id">;

export default function VendorListPage() {
  const [vendors, setVendors] = useState<IVendor[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<IVendor | null>(null);

  const getData = async () => {
    const res = await fetchVendors();
    setVendors(res);
  };

  useEffect(() => { getData(); }, []);

  const handleSubmit = async (data: VendorFormInput) => {
    if (editData) await updateVendor(editData._id!, data);
    else await createVendor(data);
    setOpen(false);
    setEditData(null);
    getData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteVendor(id);
      getData();
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Vendors</h2>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Vendor</Button>
      </div>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>GST Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors.map((v) => (
              <TableRow key={v._id}>
                <TableCell>{v.name}</TableCell>
                <TableCell>{v.contactPerson}</TableCell>
                <TableCell>{v.email}</TableCell>
                <TableCell>{v.phone}</TableCell>
                <TableCell>{v.address}</TableCell>
                <TableCell>{v.gstNumber}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => { setEditData(v); setOpen(true); }}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(v._id!)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <VendorForm
        open={open}
        onClose={() => { setOpen(false); setEditData(null); }}
        onSubmit={handleSubmit}
        editData={editData}
      />
    </div>
  );
}
