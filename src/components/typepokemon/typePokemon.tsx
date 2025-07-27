import { useEffect, useState } from "react";
import type { Type } from "../../types/typePokemon";
import axios from "axios";

interface typeProps {
  url: string;
}
export default function TypePokemon(typeProps: typeProps) {
        const [pokemonType, setPokemonType] = useState<Type| null>(null);


        useEffect(() => {
            getTypePokemon();  
        }, []);

    const getTypePokemon = async () => {
                try{
                    const response= await axios.get<Type>(typeProps.url);
                    setPokemonType(response.data);
                    console.log(response.data);
                    
                }catch
                (error) {
                    console.error("Error fetching type pokemon:", error);
                }

        
    };
    


    return (
        <div>
            <img src={pokemonType?.sprites?.["generation-viii"]["sword-shield"]?.name_icon} alt={pokemonType?.name} style={{ width: 100, height: 50, objectFit:"contain" }}  />
        </div>
    );
}