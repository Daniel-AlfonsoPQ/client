import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { getProducts, updateAvailability } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import type { Product } from "../types";

export async function loader() {
  const products = await getProducts();
  return products;
}

export async function action({request}: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await updateAvailability(+data.id)
  return {}
}
export default function Products() {
  const productos = useLoaderData() as Product[];
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold text-slate-500">Productos</h2>
        <Link
          to="/productos/nuevo"
          className="rounded-md bg-indigo-600 text-sm font-bold text-edef-text shadow-sm hover:bg-indigo-500 p-2"
        >
          Nuevo Producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <ProductDetails 
                key={producto.id}
                producto={producto}
              />  
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
