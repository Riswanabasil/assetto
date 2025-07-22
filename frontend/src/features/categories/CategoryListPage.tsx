import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/CategoryService";
import type { Category, CategoryPayload } from "../../types/category";
import CategoryFormModal from "./CategoryFormModal";
import { Pencil, Trash2 } from "lucide-react";

export default function CategoryListPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (form: CategoryPayload) => {
    await createCategory(form);
    fetchData();
    setOpen(false);
  };

  const handleUpdate = async (form: CategoryPayload) => {
    if (!selected) return;
    await updateCategory(selected._id, form);
    fetchData();
    setSelected(null);
    setOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure to delete this category?")) return;
    await deleteCategory(id);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Categories</h2>
        <button
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add New
        </button>
      </div>


     <div className="bg-white shadow rounded-lg overflow-hidden">
  <table className="w-full text-sm text-gray-700">
    <thead className="bg-gray-50">
      <tr>
        <th className="text-left px-6 py-4 font-medium">#</th>
        <th className="text-left px-6 py-4 font-medium">Name</th>
        <th className="text-left px-6 py-4 font-medium">Description</th>
        <th className="text-left px-6 py-4 font-medium">Actions</th>
      </tr>
    </thead>
    <tbody>
      {categories.map((c, idx) => (
        <tr key={c._id} className="border-t hover:bg-gray-50 transition">
          <td className="px-6 py-3">{idx + 1}</td>
          <td className="px-6 py-3 font-semibold">{c.name}</td>
          <td className="px-6 py-3">{c.description}</td>
          <td className="px-6 py-3 flex gap-3">
            <button
              onClick={() => {
                setSelected(c);
                setOpen(true);
              }}
              className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded"
              title="Edit"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => handleDelete(c._id)}
              className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </td>
        </tr>
      ))}
      {categories.length === 0 && (
        <tr>
          <td colSpan={4} className="text-center px-6 py-6 text-gray-500">
            No categories found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
      <CategoryFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={selected ? handleUpdate : handleCreate}
        initialData={selected}
      />
    </div>
  );
}
