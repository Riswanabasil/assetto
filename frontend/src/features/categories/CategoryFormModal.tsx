import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import type { Category, CategoryPayload } from "../../types/category";
import { useEffect } from "react";

const schema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
});

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryPayload) => void;
  initialData?: Category | null;
}

export default function CategoryFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryPayload>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset(
        initialData || {
          name: "",
          description: "",
        }
      );
    }
  }, [open, initialData, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Category" : "Add Category"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              {...register("name")}
              className="mt-1 w-full border px-3 py-2 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <input
              {...register("description")}
              className="mt-1 w-full border px-3 py-2 rounded"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
