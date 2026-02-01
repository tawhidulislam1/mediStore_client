import { MedicineService } from "@/services/medicine.services";
import { Eye, Pencil, Trash2, Pill, Store, Package, Plus } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getMedicineData } from "@/constants/MedicineData";

export default async function MedicinePage() {
  const { data } = await MedicineService.getMedicine(
    { status: "ACTIVE" },
    { cache: "no-store" },
  );

  return (
    <div className="w-full mx-auto px-8 py-10">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between px-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Medicine Management
          </h2>
          <p className="text-muted-foreground text-base">
            Total Records: {data?.data.length || 0}
          </p>
        </div>
        <Button size="lg" className="px-6 font-semibold shadow-md">
          <Plus className="mr-2 h-5 w-5" /> Add Medicine
        </Button>
      </div>

      {/* Main Table Card - Increased Border and Shadow */}
      <div className="rounded-xl border shadow-lg bg-card overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table className="w-full border-collapse">
            <TableHeader className="bg-muted/40">
              <TableRow className="h-16">
                {/* Increased Header Height */}
                <TableHead className="w-[5%] text-center font-semibold">
                  #
                </TableHead>
                <TableHead className="w-[15%] font-semibold">
                  Medicine Name
                </TableHead>
                <TableHead className="w-[15%] font-semibold">
                  manufacturer
                </TableHead>
                <TableHead className="w-[15%] font-semibold">
                  Category
                </TableHead>
                <TableHead className="w-[20%] font-semibold">
                  Seller Details
                </TableHead>
                <TableHead className="w-[15%] font-semibold">
                  Inventory Status
                </TableHead>
                <TableHead className="w-[15%] text-right pr-10 font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data.length ? (
                data.data.map((medicine: getMedicineData, index: number) => (
                  <TableRow
                    key={index}
                    className="group h-16 transition-all hover:bg-muted/30 border-b"
                  >
                    {/* Index */}
                    <TableCell className="text-center text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4 pl-2">
                        <span className="font-semibold text-md text-foreground">
                          {medicine.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4 pl-2">
                        <span className="font-semibold text-md text-foreground">
                          {medicine.manufacturer}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wide">
                        {medicine?.category?.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold flex items-center gap-2">
                          <Store className="h-4 w-4 text-muted-foreground" />
                          {medicine?.seller?.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-semibold">
                            {medicine.stock} pis
                          </span>
                        </div>
                        <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${medicine.stock > 20 ? "bg-emerald-500" : "bg-orange-500"}`}
                            style={{
                              width: `${Math.min(medicine.stock, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end gap-3">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-10 w-10 border-2 hover:border-primary"
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-10 w-10 border-2 hover:border-blue-500"
                        >
                          <Pencil className="h-5 w-5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-10 w-10 border-2 hover:border-destructive"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    No Data Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
