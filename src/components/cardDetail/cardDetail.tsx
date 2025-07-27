import { useEffect, useState } from "react";
import type { PokemonDetails } from "../../types/pokemon";
import axios from "axios";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { PokemonDetail } from "../pokemonDetail/pokemonDetail";
import { Await } from "react-router";
import TypePokemon from "../typepokemon/typePokemon";
interface CardDetailProps {
  url: string;
}
export function  CardDetail (cardDetailProps: CardDetailProps) {
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

 
    useEffect(() => {
        const fetchPokemonDetails = async () => {

            try{
                const response = await axios.get<PokemonDetails>(cardDetailProps.url);
                setPokemonDetails(response.data);
            } catch (error) {
                console.error("Error in useEffect:", error);
                setLoading(false);
            }finally{
                setLoading(false);
            }
        };
        fetchPokemonDetails();
        
    }, [cardDetailProps.url]);
        if (loading) return <p>Loading...</p>;
        if (!pokemonDetails) return <p>No pokemon details disponibles</p>;
    return (
       
       
        <Card variant="outlined"   style={{ height:"350px", padding: '20px', margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
            <CardMedia component={"img"} height={200}  sx={{ width: 251, objectFit:"contain" }} image={pokemonDetails?.sprites?.other?.["official-artwork"]?.front_default} alt={pokemonDetails?.name}>
            </CardMedia>
            <CardContent style={{ flex: '1 0 auto' }}>
                <Typography variant="h5" component="div" style={{ textTransform: 'capitalize', marginBottom: '16px' }}>
                    {pokemonDetails?.name}
                </Typography> 
                <Grid container spacing={8} style={{  }}>
                </Grid>
            </CardContent>
                <Button 
                onClick={handleOpen} 
                variant="outlined" 
                color="error"
                sx={{ padding: '8px 16px' }}
            >
                Ver Detalles
            </Button>     
            <CardActions>
            </CardActions>
            <PokemonDetail
            pokedetail={pokemonDetails}
            open={open}
            handleClose={handleClose}
        />    
        </Card>

    )
}