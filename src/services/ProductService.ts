import { safeParse, pipe, number, string, transform, parse } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductsSchema, ProductSchema } from "../types";
import type { Product } from "../types";
import { toBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData) {
    try {  
        const parsed = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        });
        if (parsed.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            await axios.post(url, {
                name: parsed.output.name,
                price: parsed.output.price
            })
        }else{
            throw new Error("Datos no válidos");
        }
    } catch (error) {
        console.error("Error adding product:", error);
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const response = await axios.get(url);
        const parsed = safeParse(ProductsSchema, response.data.data);
        if (parsed.success) {
            return parsed.output;
        }else{
            throw new Error("Error validating products data");
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getProductById(id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const response = await axios.get(url);
        const parsed = safeParse(ProductSchema, response.data.data);
        if (parsed.success) {
            return parsed.output;
        }else{
            throw new Error("Error validating products data");
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateProduct(id: Product["id"], data: ProductData) {
    try {
        const NumberSchema = pipe(string(), transform(Number), number());
        const parsed = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            isAvailable: toBoolean(data.isAvailable.toString())
        });
        if (parsed.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url, {
                name: parsed.output.name,
                price: parsed.output.price,
                isAvailable: parsed.output.isAvailable
            });
        }else{
            throw new Error("Datos no válidos");
        }
    } catch (error) {
        console.error("Error updating product:", error);
    }
}

export async function deleteProduct(id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.error("Error deleting product:", error);
    }
}

export async function updateAvailability(id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.patch(url);
    } catch (error) {
        console.error("Error updating product availability:", error);
    }
}