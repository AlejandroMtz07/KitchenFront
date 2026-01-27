import { isAxiosError } from "axios";
import api from "../config/axios";
import type { BackendRecipes } from "../types";

export async function getRecipes() {
    const token = localStorage.getItem('token');
    try {
        const { data } = await api.get<BackendRecipes>(
            '/recipes',
            { headers: { Authorization: `Bearer ${token}` } }
        )
        return (data.recipes);
    } catch (error) {
        if (isAxiosError(error) && error.message) {
            console.log(error.message);
        }
    }
}