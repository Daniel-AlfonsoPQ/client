import {
  Link,
  Form,
  useActionData,
  type ActionFunctionArgs,
  redirect,
  type LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import {
  addProduct,
  getProductById,
  updateProduct,
} from "../services/ProductService";
import type { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      return redirect("/"); // Redirect if no ID is provided
    }
    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());
  let error = "";

  if (Object.values(formData).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error) {
    return error;
  }

  if (params.id !== undefined) {
    await updateProduct(+params.id, formData);
    return redirect("/");
  }
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function EditProduct() {
  const error = useActionData() as string;
  const product = useLoaderData() as Product;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold text-slate-500">Editar Producto</h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 text-sm font-bold text-edef-text shadow-sm hover:bg-indigo-500 p-2"
        >
          Volver a Productos
        </Link>
      </div>

      {error ? <ErrorMessage>{error}</ErrorMessage> : null}

      <Form className="mt-10" method="post">
        <ProductForm product={product} />

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="isAvailable">
            Disponibilidad:
          </label>
          <select
            id="isAvailable"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="isAvailable"
            defaultValue={product?.isAvailable.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-edef-text font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />
      </Form>
    </>
  );
}
