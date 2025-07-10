import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({request} : ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());
  let error = ''

  if(Object.values(formData).includes('')) {
    error = 'Todos los campos son obligatorios';
  }
  if(error) {
    return error;
  }

  await addProduct(formData)

  return redirect('/');
}

export default function NewProduct() {
  const error = useActionData() as string;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold text-slate-500">
          Registrar Producto
        </h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 text-sm font-bold text-edef-text shadow-sm hover:bg-indigo-500 p-2"
        >
          Volver a Productos
        </Link>
      </div>

      { error ? <ErrorMessage>{error}</ErrorMessage> : null }

      <Form className="mt-10"
        method="post"     
      >
        <ProductForm />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-edef-text font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
