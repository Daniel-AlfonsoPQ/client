import { Form, redirect, useFetcher, useNavigate, type ActionFunctionArgs } from "react-router-dom";
import type { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  producto: Product;
};

export async function action({params} : ActionFunctionArgs) {
  if(params.id !== undefined){
    await deleteProduct(+params.id);
    return redirect('/');
  }
}

export default function ProductDetails({ producto }: ProductDetailsProps) {

  const fetcher = useFetcher()
    const navigate = useNavigate();

    const isAvailable = producto.isAvailable ? "Disponible" : "No disponible";
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">
        {producto.name}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(producto.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={producto.id}
            className={`${producto.isAvailable ? "text-black" : "text-red-600"} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
          >
              {isAvailable}
            </button>
        </fetcher.Form>
        
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
            <button 
                className="bg-indigo-600 text-edef-text px-4 py-2 rounded-lg hover:bg-indigo-500 uppercase w-full text-xs text-center font-bold cursor-pointer"
                onClick={() => navigate(`/productos/${producto.id}/editar`
                )}
                >
                Editar
            </button>
            <Form 
              className="w-full" 
              method="POST" 
              action={`productos/${producto.id}/eliminar`}
              onSubmit={(e) => {
                if (!confirm("¿Deseas eliminar este producto?")) {
                  e.preventDefault();
                }
              }}
            >
                <input
                    type="submit"
                    value="Eliminar"
                    className="bg-red-600 text-edef-text px-4 py-2 rounded-lg hover:bg-red-500 uppercase w-full text-xs text-center font-bold cursor-pointer"
                />
            </Form>
        </div>
      </td>
    </tr>
  );
}
