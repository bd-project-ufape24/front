import { api } from "./api";

export async function question(number) {
    return await api.get(`/question${number}`);
}