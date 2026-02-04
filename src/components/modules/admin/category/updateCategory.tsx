"use client";

import { createCategory, updateCategory } from "@/action/category.action";
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
import { categoryOptionData } from "@/constants/categoryData";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
export interface CategoryResponse {
  data: categoryOptionData[];
}
type UpdateCategoryProps = {
  user: {
    id: string;
  };
  data: CategoryResponse | null;
};
const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(200, "Name must be less than 200 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must be less than 5000 characters"),
  userId: z.string(),
});

export function UpdateCategory({ user, data }: UpdateCategoryProps) {
  const categoryData = data?.data[0];
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: categoryData?.name,
      description: categoryData?.name,
      userId: user?.id,
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating....");

      const categoryinfo = {
        name: value.name,
        description: value.description,
        userId: value.userId,
      };

      try {
        if (!categoryData) {
          return <div>Loading...</div>;
        }
        const res = await updateCategory(categoryData?.id, categoryinfo);
        if (res.error) {
          toast.error("Something Went Wrong", { id: toastId });
        }
        toast.success("Category Updated", { id: toastId });
        router.push("/admin-dashboard/category");
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>update Category</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="blog-post"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      defaultValue={categoryData?.name}
                    >
                      Category Name
                    </FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Category Name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      defaultValue={categoryData?.name}
                    >
                      Description
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Category Description"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button form="blog-post" type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
