"use client";

import {  Store, Eye } from "lucide-react";
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
import { Order } from "@/constants/OrdarData"

type Props = {
  data: Order[] | null;
};

export default function OrderTable({ data }: Props) {
  const orders = data || [];

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
      <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead className="min-w-30">Customer</TableHead>
              <TableHead className="min-w-30">Payment</TableHead>
              <TableHead className="min-w-25">Total</TableHead>
              <TableHead className="min-w-25">Quantity</TableHead>
              <TableHead className="min-w-30">Status</TableHead>
              <TableHead className="text-right pr-4">Actions</TableHead>
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
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <TableCell className="text-center text-muted-foreground">
                      {index + 1}
                    </TableCell>

                    <TableCell className="font-medium truncate">
                      {order.customer?.name ?? "N/A"}
                    </TableCell>

                    <TableCell className="truncate">
                      {order.paymentGateway}
                    </TableCell>

                    <TableCell className="truncate">
                      ৳ {order.totalPrice}
                    </TableCell>

                    <TableCell className="truncate">{totalQuantity}</TableCell>

                    <TableCell className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize truncate">
                        {order.status}
                      </span>
                    </TableCell>

                    <TableCell className="text-right pr-4">
                      <div className="flex justify-end gap-2 flex-wrap sm:flex-nowrap">
                        <Link href={`/admin-dashboard/order/${order.id}`}>
                          <Button size="icon" variant="outline">
                            <Eye className="h-4 w-4 text-blue-600" />
                          </Button>
                        </Link>
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
  );
}
