"use client";

import { Trash2, Store, Eye } from "lucide-react";
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
import { deleteOrder } from "@/action/order.action";
import { Order } from "@/constants/OrdarData";

type Props = {
  data: Order[] | null;
};

export default function OrderTable({ data }: Props) {
  const orders = data || [];
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    const toastId = toast.loading("Deleting order...");

    try {
      const res = await deleteOrder(id);

      if (res?.error) {
        toast.error("Failed to delete order", { id: toastId });
      } else {
        toast.success("Order deleted successfully", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Orders</h2>
          <p className="text-sm text-muted-foreground">
            Total Records: {orders.length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-255">
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-15 text-center">#</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.length > 0 ? (
                orders.map((order, index) => {
                  const totalQuantity = order.orderItems.reduce(
                    (sum, item) => sum + item.quantity,
                    0,
                  );

                  return (
                    <TableRow
                      key={order.id}
                      className="hover:bg-muted/30 transition"
                    >
                      <TableCell className="text-center text-muted-foreground">
                        {index + 1}
                      </TableCell>

                      <TableCell className="font-medium">
                        {order.customer?.name ?? "N/A"}
                      </TableCell>

                      <TableCell>{order.paymentGateway}</TableCell>

                      <TableCell>৳ {order.totalPrice}</TableCell>

                      <TableCell>{totalQuantity}</TableCell>

                      <TableCell className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-muted-foreground" />
                        <span className="capitalize">{order.status}</span>
                      </TableCell>

                      <TableCell className="text-right pr-6">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin-dashboard/order/${order.id}`}>
                            <Button size="icon" variant="outline">
                              <Eye className="h-4 w-4 text-blue-600" />
                            </Button>
                          </Link>

                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleDelete(order.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-40 text-center text-muted-foreground"
                  >
                    No Orders Found
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
