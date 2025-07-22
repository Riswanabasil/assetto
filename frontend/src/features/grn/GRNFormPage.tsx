import { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { createGRN, getGRNById, updateGRN } from "../../services/grnApis";
import { fetchVendors } from "../../services/VendorService";
import { getAllBranches } from "../../services/BranchService";
import { getAllSubcategories } from "../../services/SubCategoryService";

import type { GRNPayloads, GRNLineItem } from "../../types/grn";
import type { IVendor } from "../../types/vendor";
import type { IBranch } from "../../types/branch";
import type { IAssetSubcategory } from "../../types/asset";
import type { SelectChangeEvent } from "@mui/material";


const defaultItem: GRNLineItem = {
  subcategoryId: "",
  itemDescription: "",
  quantity: 0,
  unitPrice: 0,
  taxPercent: 0,
  totalAmount: 0,
};

export default function GRNFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<GRNPayloads>({
    grnDate: "",
    invoiceNumber: "",
    vendorId: "",
    branchId: "",
    items: [defaultItem],
  });

  const [vendors, setVendors] = useState<IVendor[]>([]);
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [subcategories, setSubcategories] = useState<IAssetSubcategory[]>([]);

  useEffect(() => {
    (async () => {
      const [vendorData, branchData, subcatData] = await Promise.all([
        fetchVendors(),
        getAllBranches(),
        getAllSubcategories(),
      ]);
      setVendors(vendorData);
      setBranches(branchData);
      setSubcategories(subcatData);

      if (id) {
        const existing = await getGRNById(id);
        setForm(existing);
      }
    })();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (
    index: number,
    key: keyof GRNLineItem,
    value: string
  ) => {
    const updatedItems = [...form.items];

    if (["quantity", "unitPrice", "taxPercent"].includes(key)) {
      (updatedItems[index][key] as number) = parseFloat(value) || 0;
    } else {
      (updatedItems[index][key] as string) = value;
    }

    const { quantity, unitPrice, taxPercent } = updatedItems[index];
    const taxable = quantity * unitPrice;
    const total = taxable + (taxable * taxPercent) / 100;
    updatedItems[index].totalAmount = parseFloat(total.toFixed(2));

    setForm({ ...form, items: updatedItems });
  };

  const handleAddItem = () => {
    setForm({ ...form, items: [...form.items, { ...defaultItem }] });
  };

  const handleRemoveItem = (index: number) => {
    const updated = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: updated });
  };

  const handleSubmit = async () => {
    try {
      if (id) {
        await updateGRN(id, form);
        Swal.fire("Updated!", "GRN updated successfully", "success");
      } else {
        await createGRN(form);
        Swal.fire("Created!", "GRN created successfully", "success");
      }
      navigate("/grn");
    } catch {
      Swal.fire("Error", "Failed to submit GRN", "error");
    }
  };

  return (
    <Paper className="p-6 space-y-6">
      <Typography variant="h6" className="font-bold">
        {id ? "Edit GRN" : "Create GRN"}
      </Typography>

      {/* GRN Details */}
      <div className="grid grid-cols-2 gap-4">
        <TextField
          name="grnDate"
          label="GRN Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.grnDate}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="invoiceNumber"
          label="Invoice Number"
          value={form.invoiceNumber}
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Select Vendor</InputLabel>
          <Select
            name="vendorId"
            value={form.vendorId}
            onChange={handleSelectChange}
            label="Select Vendor"
          >
            {vendors.map((v) => (
              <MenuItem key={v._id} value={v._id}>
                {v.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Select Branch</InputLabel>
          <Select
            name="branchId"
            value={form.branchId}
            onChange={handleSelectChange}
            label="Select Branch"
          >
            {branches.map((b) => (
              <MenuItem key={b._id} value={b._id}>
                {b.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* GRN Items */}
      <div className="space-y-4">
        {form.items.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-3 gap-4 border p-4 rounded-md"
          >
            <FormControl fullWidth>
              <InputLabel>Subcategory</InputLabel>
              <Select
                value={item.subcategoryId}
                onChange={(e) =>
                  handleItemChange(idx, "subcategoryId", e.target.value)
                }
                label="Subcategory"
              >
                {subcategories.map((s) => (
                  <MenuItem key={s._id} value={s._id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Description"
              value={item.itemDescription}
              onChange={(e) =>
                handleItemChange(idx, "itemDescription", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Qty"
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(idx, "quantity", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Unit Price"
              type="number"
              value={item.unitPrice}
              onChange={(e) =>
                handleItemChange(idx, "unitPrice", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Tax (%)"
              type="number"
              value={item.taxPercent}
              onChange={(e) =>
                handleItemChange(idx, "taxPercent", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Total"
              type="number"
              value={item.totalAmount}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <Button
              color="error"
              variant="outlined"
              onClick={() => handleRemoveItem(idx)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button onClick={handleAddItem} variant="outlined">
          + Add Item
        </Button>
      </div>

      <Button onClick={handleSubmit} variant="contained" color="primary">
        {id ? "Update GRN" : "Create GRN"}
      </Button>
    </Paper>
  );
}
