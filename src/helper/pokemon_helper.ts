import axios from "axios";
import type { PokemonDetails } from "../types/pokemon";

interface PokedetailProp {
    name: string
}
export default class PokemonHelper {

    static async getPokemonDetail(pokedetailProp: PokedetailProp): Promise<PokemonDetails> {
        try {
            const response = await axios.get<PokemonDetails>(   `https://pokeapi.co/api/v2/pokemon/${pokedetailProp.name.toLowerCase()}`);
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Error fetching Pokemon details: ${response.statusText}`);
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new Error(`Pokemon "${pokedetailProp.name}" not found`);
                }
                throw new Error(`API Error: ${error.response?.statusText || error.message}`);
            }
            throw new Error(`Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}