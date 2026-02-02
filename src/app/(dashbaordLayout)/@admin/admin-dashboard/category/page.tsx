import CategoryTable from "@/components/modules/admin/category/categoryTable";
import { categoryService } from "@/services/category.services";

export default async function CategoryPage() {
  const { data } = await categoryService.getCategory({
    cache: "no-store",
  });
  return (
    <div>
      <CategoryTable data={data.data ? data : null} />
    </div>
  );
}
