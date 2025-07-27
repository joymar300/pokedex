import { useEffect, useState } from "react"
import type { PokemonSpecies } from "../../types/pokemon-species"
import axios from "axios";
import type { Evolutionschain } from "../../types/evolution-chain";
import PokemonHelper from "../../helper/pokemon_helper";
import { Box, Card, CardContent, CardMedia, Container, Grid, Paper, Typography } from "@mui/material";
import body_bg from "../../assets/body_bg.png";
import body_gray_bg from "../../assets/body_gray_bg.png";
interface EspeciesProp {
    url: string
}
export default function EvolutionsChain(especiesProp: EspeciesProp) {

    const [especies, SetEspecies] = useState<PokemonSpecies>()
    const [loading, setLoading] = useState(true);
    const [evolution, SetEvolution] = useState<Evolutionschain>();

    useEffect(() => {
        getEspecies();
    }, []);


    const getEspecies = async () => {
        try {
            const response = await axios.get<PokemonSpecies>(especiesProp.url);
            SetEspecies(response.data);
            console.log(response.data);
            const evolutionResponse = await axios.get<Evolutionschain>(response.data.evolution_chain.url);
            SetEvolution(evolutionResponse.data);
            console.log(evolutionResponse.data);
        } catch (error) {
            console.error("Error fetching species:", error);
        } finally {
            setLoading(false);
        }

    }

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <>

            <Box sx={{ marginBottom: '20px', backgroundImage: `url(${body_bg})`, padding: 2, borderRadius: 2, color: '#fff' }}>
                <Typography variant="h6" component="h1" gutterBottom style={{ textAlign: 'center', marginTop: '20px' }}>
                    {especies?.genera.find(gen => gen.language.name === 'es')?.genus || "genus no disponible"}
                </Typography>
                <Typography variant="subtitle1" component="h2" gutterBottom style={{ textAlign: 'center', marginTop: '20px' }}>
                    {especies?.flavor_text_entries.find(entry => entry.language.name === 'es')?.flavor_text || "No description available"}
                </Typography>
            </Box>
            {(evolution?.chain.evolves_to.length === 0) ? <p></p> :
                <Box sx={{ marginTop: 4, backgroundImage: `url(${body_gray_bg})`, padding: 2, borderRadius: 2, color: '#fff'  }}>
                  

                    
                    <Typography variant="h4" component="h2" gutterBottom style={{ textAlign: 'center', marginTop: '20px' }}>
                        Cadena de Evolución
                    </Typography>
                    <Grid container spacing={2} style={{ marginTop: '20px', justifyContent: 'center',backgroundColor: '#eceaea93' }}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}  >
                            <Card elevation={0} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#ffffff07', color: '#fff' }}>
                                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                    <Typography variant="h4">{evolution?.chain.species.name}</Typography>
                                    <Paper sx={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', width: '100px', borderRadius: '50%', }}>
                                        <PokemonImage name={evolution?.chain.species.name || ""} height={100} width={100} />
                                    </Paper>
                                    <Typography variant="body1" style={{ marginTop: '10px' }}>
                                        Min Level: {evolution?.chain.evolves_to[0]?.evolution_details[0]?.min_level || "N/A"}
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Grid>
                        {evolution?.chain.evolves_to.map((evolve, index) => (
                            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Card elevation={0} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#ffffff07', color: '#fff' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>

                                        <Typography variant="h4">{evolve.species.name} </Typography>
                                        <Paper sx={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', width: '100px', borderRadius: '50%' }}>
                                            <PokemonImage name={evolve.species.name || ""} height={100} width={100} />
                                        </Paper>

                                        <Typography variant="body1" style={{ marginTop: '10px' }}>
                                            Min Level: {evolve.evolution_details[0].min_level || "N/A"}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                        { }

                        {evolution?.chain.evolves_to[0].evolves_to.map((subEvolve, subIndex) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Card key={subIndex} elevation={0} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#ffffff07', color: '#fff' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>

                                        <Typography variant="h4">
                                            {subEvolve.species.name}

                                        </Typography>
                                        <Paper sx={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', width: '100px', borderRadius: '50%', }}>

                                            <PokemonImage name={subEvolve.species.name || "Evolution no aviable"} height={100} width={100} />
                                        </Paper>

                                        <Typography variant="body1" style={{ marginTop: '10px' }}>
                                            Min Level: {subEvolve.evolution_details[0].min_level || "N/A"}
                                        </Typography>




                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </Box>
                
            }



        </>
    )

}
interface PokemonImageProps {
    name: string;
    height?: number | string;
    width?: number | string;
    style?: React.CSSProperties;
}
export function PokemonImage({ name, height = 200, width = 200, style = {} }: PokemonImageProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const detail = await PokemonHelper.getPokemonDetail({ name });
                setImageUrl(detail?.sprites?.other?.["official-artwork"]?.front_default || null);
            } catch (error) {
                console.error("Error fetching Pokemon image:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [name]);

    if (loading) return <div>Loading image...</div>;
    if (!imageUrl) return <div>No image available</div>;

    return <img src={imageUrl} alt={name} style={{
        objectFit: "contain",
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
        ...style
    }} />;
}