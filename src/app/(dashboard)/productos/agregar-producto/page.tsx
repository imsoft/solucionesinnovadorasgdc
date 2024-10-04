"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  product: z
    .string()
    .min(2, {
      message: "El nombre del producto debe tener al menos 2 caracteres.",
    })
    .max(100, {
      message: "El nombre del producto no puede exceder los 100 caracteres.",
    }),
  price: z
    .number()
    .min(0, { message: "El precio debe ser un número positivo." }),
  internalSku: z
    .string()
    .min(1, { message: "El SKU es obligatorio." })
    .max(50, { message: "El SKU no puede exceder los 50 caracteres." }),
  createdAt: z.date().optional(), // Este campo es opcional porque generalmente es autogenerado
  updatedAt: z.date().optional(), // Este campo también es autogenerado
});

const AddProductPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "", // Nombre del producto por defecto
      price: undefined, // Precio por defecto (puedes ajustarlo si quieres otro valor inicial)
      internalSku: "", // SKU interno por defecto
      createdAt: undefined, // Campos opcionales
      updatedAt: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Agregar producto
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Llena el formulario para agregar un nuevo producto.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del producto</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-3">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio</FormLabel>
                      <FormControl>
                        <div className="relative mt-2 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <Input
                            {...field}
                            placeholder="0.00"
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span
                              id="price-currency"
                              className="text-gray-500 sm:text-sm"
                            >
                              MXN
                            </span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-3">
                <FormField
                  control={form.control}
                  name="internalSku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU Interno</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="text-white" type="submit">
                Agregar producto
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddProductPage;
