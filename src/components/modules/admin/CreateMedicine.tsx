"use client";

import { createMedicinePost } from "@/action/medicine.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { FieldApi, useForm } from "@tanstack/react-form";
import { toast } from "sonner";

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
      price: "",
      stock: "",
      manufacturer: "",
      expiryDate: "",
      image: "",
      categoryId: "",
    },
    validate: {
      name: (value) =>
        !value || value.trim().length < 2 ? "Name is required" : undefined,
      price: (value) => {
        if (!value) return "Price is required";
        if (Number(value) <= 0) return "Price must be greater than 0";
      },
      stock: (value) => {
        if (!value) return "Stock is required";
        if (Number(value) < 0) return "Stock cannot be negative";
      },
      manufacturer: (value) =>
        !value || value.trim().length < 2
          ? "Manufacturer is required"
          : undefined,
      expiryDate: (value) => (!value ? "Expiry Date is required" : undefined),
      categoryId: (value) =>
        !value || Number(value) === 0 ? "Select a category" : undefined,
      image: (value) =>
        value && !/^https?:\/\/.+/.test(value)
          ? "Image must be a valid URL"
          : undefined,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating...");

      const data = {
        name: value.name,
        description: value.description,
        price: Number(value.price),
        stock: Number(value.stock),
        manufacturer: value.manufacturer,
        expiryDate: new Date(value.expiryDate),
        image: value.image,
        categoryId: Number(value.categoryId),
        sellerId: user?.id,
      };

      try {
        const res = await createMedicinePost(data);
        if (res.error) {
          toast.error("Something Went Wrong", { id: toastId });
        } else {
          toast.success("Medicine Created", { id: toastId });
          form.reset();
        }
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId });
      }
    },
  });

  const FormField: any = form.Field;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create Medicine</CardTitle>
        <CardDescription>Fill out the medicine details below</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="medicine"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Name */}
            <FormField name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Medicine Name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </FormField>

            {/* Description */}
            <FormField name="description">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Description"
                  />
                </Field>
              )}
            </FormField>

            {/* Price & Stock */}
            <div className="flex gap-4">
              <FormField name="price">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                      <Input
                        type="number"
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Price"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </FormField>

              <FormField name="stock">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
                      <Input
                        type="number"
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Stock"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </FormField>
            </div>

            {/* Manufacturer */}
            <FormField name="manufacturer">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Manufacturer</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Manufacturer"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </FormField>

            {/* Image */}
            <FormField name="image">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                    <Input
                      type="url"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Image URL"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </FormField>

            {/* Expiry & Category */}
            <div className="flex gap-4">
              <FormField name="expiryDate">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Expiry Date</FieldLabel>
                      <Input
                        type="date"
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </FormField>

              <FormField name="categoryId">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                      <select
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full border rounded px-2 py-1"
                      >
                        <option value={0}>Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </FormField>
            </div>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col">
        <Button form="medicine" type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
