"use client";

import { Eye, Trash2, Store, Package, Plus, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { deleteMedicine } from "@/action/medicine.action";
import { getMedicineData } from "@/constants/MedicineData";

interface MedicineTableProps {
  data: { data: getMedicineData[] } | null;
  userRole: "SELLER" | "ADMIN";
}

export default function MedicineTable({ data, userRole }: MedicineTableProps) {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this medicine?")) return;

    const toastId = toast.loading("Deleting medicine...");

    try {
      const res = await deleteMedicine(id);
      if (res?.error) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        toast.success("Medicine deleted successfully", { id: toastId });
      }
    } catch {
      toast.error("Failed to delete medicine", { id: toastId });
    }
  };

  const getRoute = (medicineId?: string, action: "view" | "add" = "view") => {
    if (userRole === "SELLER") {
      return action === "add"
        ? "/seller-dashboard/medicine/add-medicine"
        : `/seller-dashboard/medicine/view/${medicineId}`;
    }
    return action === "add"
      ? "/admin-dashboard/medicine/add-medicine"
      : `/admin-dashboard/medicine/view/${medicineId}`;
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Medicine Management
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Total Records: {data?.data.length || 0}
          </p>
        </div>

        <Link href={getRoute(undefined, "add")}>
          <Button size="lg" className="w-full sm:w-auto">
            <Plus className="mr-2 h-5 w-5" /> Add Medicine
          </Button>
        </Link>
      </div>

      {/* Table Wrapper */}
      <div className="rounded-xl border bg-card shadow-lg">
        <div className="relative w-full overflow-x-auto">
          <div className="min-w-[1100px]">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow className="h-14">
                  <TableHead className="w-[5%] text-center">#</TableHead>
                  <TableHead className="w-[15%]">Medicine</TableHead>
                  <TableHead className="hidden md:table-cell w-[15%]">
                    Manufacturer
                  </TableHead>
                  <TableHead className="w-[15%]">Category</TableHead>
                  <TableHead className="hidden lg:table-cell w-[10%]">
                    Seller
                  </TableHead>
                  <TableHead className="w-[10%]">Status</TableHead>
                  <TableHead className="hidden sm:table-cell w-[15%]">
                    Inventory
                  </TableHead>
                  <TableHead className="w-[15%] text-right pr-6">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data?.data?.length ? (
                  data.data.map((medicine, index) => (
                    <TableRow
                      key={medicine.id}
                      className="h-16 hover:bg-muted/30"
                    >
                      <TableCell className="text-center">
                        {index + 1}
                      </TableCell>

                      <TableCell className="font-semibold">
                        {medicine.name}
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        {medicine.manufacturer
                          .split(" ")
                          .slice(0, 3)
                          .join(" ")}
                      </TableCell>

                      <TableCell>
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-secondary">
                          {medicine?.category?.name}
                        </span>
                      </TableCell>

                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Store className="h-4 w-4" />
                          {medicine?.seller?.name}
                        </div>
                      </TableCell>

                      <TableCell className="font-semibold">
                        {medicine.status}
                      </TableCell>

                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          {medicine.stock} pcs
                        </div>
                      </TableCell>

                      <TableCell className="text-right pr-4">
                        <div className="flex justify-end gap-2">
                          <Link href={getRoute(medicine.id)}>
                            <Button size="icon" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>

                          {userRole === "SELLER" && (
                            <Link
                              href={`/seller-dashboard/medicine/${medicine.id}`}
                            >
                              <Button size="icon" variant="outline">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}

                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleDelete(medicine.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="h-60 text-center text-muted-foreground"
                    >
                      No Data Available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
