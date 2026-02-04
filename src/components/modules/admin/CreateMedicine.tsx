"use client";

import { createMedicinePost } from "@/action/medicine.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

/* ---------------- ZOD SCHEMA ---------------- */
const productSchema = z.object({
  name: z.string().min(1),
  price: z.number(),
  stock: z.number(),
  categoryId: z.number(),
  manufacturer: z.string(),
  expiryDate: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
});
type MedicineFormValues = z.infer<typeof productSchema>;

export function CreateMedicine({
  user,
  categories,
}: {
  user: { id: string };
  categories: { id: number; name: string }[];
}) {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      manufacturer: "",
      expiryDate: "",
      image: "",
      categoryId: 0,
    } as MedicineFormValues,
    validators: {
      onSubmit: productSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating medicine...");

      try {
        const res = await createMedicinePost({
          ...value,
          price: Number(value.price),
          stock: Number(value.stock),
          categoryId: Number(value.categoryId),
          expiryDate: new Date(value.expiryDate),
          sellerId: user.id,
        });

        if (res?.error) {
          toast.error("Something went wrong", { id: toastId });
        } else {
          toast.success("Medicine created successfully", { id: toastId });
          form.reset();
        }
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create Medicine</CardTitle>
        <CardDescription>Fill out the medicine details</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          <FieldGroup>
            {/* Name */}
            <form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>

            {/* Price & Stock */}
            <div className="flex gap-4">
              <form.Field name="price">
                {(field) => (
                  <Field>
                    <FieldLabel>Price</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              <form.Field name="stock">
                {(field) => (
                  <Field>
                    <FieldLabel>Stock</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </div>

            {/* Manufacturer */}
            <form.Field name="manufacturer">
              {(field) => (
                <Field>
                  <FieldLabel>Manufacturer</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Image */}
            <form.Field name="image">
              {(field) => (
                <Field>
                  <FieldLabel>Image URL</FieldLabel>
                  <Input
                    type="url"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Expiry & Category */}
            <div className="flex gap-4">
              <form.Field name="expiryDate">
                {(field) => (
                  <Field>
                    <FieldLabel>Expiry Date</FieldLabel>
                    <Input
                      type="date"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              <form.Field name="categoryId">
                {(field) => (
                  <Field>
                    <FieldLabel>Category</FieldLabel>
                    <select
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      className="w-full border rounded px-2 py-1"
                    >
                      <option value={0}>Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </div>

            <Button type="submit" className="w-full">
              Create Medicine
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
