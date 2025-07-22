import { useEffect, useState } from "react";
import { deleteGRN, filterGRNs } from "../../services/grnApis";
import { fetchVendors } from "../../services/VendorService";
import { getAllBranches } from "../../services/BranchService";
import type { GRNResponse } from "../../types/grn";
import type { IVendor } from "../../types/vendor";
import type { IBranch } from "../../types/branch";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { exportGRNsToExcel } from "../../utils/exportToExcel";
import { Pencil, Trash2 } from "lucide-react";

export default function GRNListPage() {
  const [grns, setGRNs] = useState<GRNResponse[]>([]);
  const [vendors, setVendors] = useState<IVendor[]>([]);
  const [branches, setBranches] = useState<IBranch[]>([]);

  const [vendorId, setVendorId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [v, b] = await Promise.all([fetchVendors(), getAllBranches()]);
    setVendors(v);
    setBranches(b);
    const initialGRNs = await filterGRNs();
    console.log(initialGRNs);
    setGRNs(initialGRNs);
  };

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This GRN will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await deleteGRN(id);
      const updated = await filterGRNs(vendorId, branchId, startDate, endDate);
      setGRNs(updated);
      Swal.fire("Deleted!", "GRN has been deleted.", "success");
    }
  };

  const handleFilter = async () => {
    const filtered = await filterGRNs(vendorId, branchId, startDate, endDate);
    setGRNs(filtered);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">GRN List</h2>

      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate("/grns/create")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add GRN
        </button>
        <button
          onClick={() => exportGRNsToExcel(grns)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          ⬇️ Download Report
        </button>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <select
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
          className="border p-2"
        >
          <option value="">All Vendors</option>
          {vendors.map((v) => (
            <option key={v._id} value={v._id}>
              {v.name}
            </option>
          ))}
        </select>

        <select
          value={branchId}
          onChange={(e) => setBranchId(e.target.value)}
          className="border p-2"
        >
          <option value="">All Branches</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2"
        />

        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-1"
        >
          Apply Filters
        </button>
      </div>

      {/* Table Section */}
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">GRN #</th>
            <th className="p-2 border">Invoice</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Vendor</th>
            <th className="p-2 border">Branch</th>
            <th className="p-2 border">Total Amount</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {grns.map((grn) => (
            <tr key={grn._id}>
              <td className="p-2 border">{grn.grnNumber}</td>
              <td className="p-2 border">{grn.invoiceNumber}</td>
              <td className="p-2 border">
                {new Date(grn.grnDate).toLocaleDateString()}
              </td>
              <td className="p-2 border">{grn.vendor}</td>
              <td className="p-2 border">{grn.branch}</td>
              <td className="p-2 border">₹{grn.totalAmount.toFixed(2)}</td>
              {/* <td className="p-2 border space-x-2">
                <button
                  onClick={() => navigate(`/grns/edit/${grn._id}`)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(grn._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td> */}

              <td className="p-2 border space-x-2 flex">
                <button
                  onClick={() => navigate(`/grns/edit/${grn._id}`)}
                  className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(grn._id)}
                  className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          {grns.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No GRNs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
