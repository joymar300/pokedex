import { Box, Container, Grid, IconButton, Pagination, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Pokemons } from "../../types/pokemon";
import { CardDetail } from "../../components/cardDetail/cardDetail";
import SearchIcon from '@mui/icons-material/Search';
import pokeball_white from '../../assets/pokebal_white.svg';


export default function Home() {
    const [posts, setPosts] = useState<Pokemons[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [allPokemons, setAllpokemons] = useState<Pokemons[]>([]);
    const [listadePokemons, setListadePokemons] = useState<Pokemons[]>([]);
    const [filtro, setFiltro] = useState<string>("");
    const [limit, _setLimit] = useState<number>(20);
    const [total, setTotal] = useState<number>(0);
    const [offset, _setOffset] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getallpokemon();
        getpokemon(offset);
    }, []);

    const getpokemon = async (o: number) => {

        await axios.get("https://pokeapi.co/api/v2/pokemon?" + limit + "&offset=" + o).then((response) => {
            setPosts(response.data.results);
            setListadePokemons(response.data.results);
            setTotal(response.data.count);


        }).catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        })
    };

    const getallpokemon = async () => {

        await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0").then((response) => {
            setAllpokemons(response.data.results);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        })
    };

    const buscarPokemon = async (e: React.KeyboardEvent) => {
        if (e.key === "Enter") { // Enter key
            const searchTerm = filtro.trim().toLowerCase();
            if (searchTerm === "") {
                setListadePokemons(posts);
                setIsSearching(false);
                setCurrentPage(1);
            } else {
                const filtrado = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));

                setListadePokemons(filtrado);
                setIsSearching(true);
            }
        } else if (filtro.trim() == '') { // Escape key
            setListadePokemons([]);
            setTimeout(() => {
                setListadePokemons(posts)
                setIsSearching(false);
            }, 100)
        }
    }

    const gopage = async (event: React.ChangeEvent<unknown>, page: number) => {
        setListadePokemons([]);
        await getpokemon((page == 1) ? 0 : ((page - 1) * 20));
        setCurrentPage(page);

    }

    if (loading) return <p>Cargando datos...</p>;
    return (
        <>
            
            <Container maxWidth="lg"    style={{ padding: '0', backgroundColor: '#f5f5f5' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', backgroundColor: '#a81616ff', padding: '10px', gap:'10px'  }}>
                    <img src={pokeball_white} height={60}></img>
                    <Paper  sx={{ paddingLeft:'10px', display: 'flex', justifyContent: 'center', width: '50%', height: "60px" , borderRadius: '10px' }}>
                        <TextField
                            label="Buscar Pokémon"
                            variant="standard"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                            onKeyUp={buscarPokemon} // Changed to onKeyUp
                            fullWidth
                            color="error"
                            
                        >
                        </TextField>
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => buscarPokemon({ key: 'Enter' } as React.KeyboardEvent)}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Box>
                {isSearching ? "" :
                    <Pagination style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} color="standard" count={Math.ceil(total / 20)} page={currentPage} onChange={gopage} />
                }
                <Grid container spacing={2}>
                    {listadePokemons.map((post, index) => (

                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                            <CardDetail url={post.url} />
                        </Grid>

                    ))}

                </Grid>
                {isSearching ? "" :
                    <Pagination style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} color="standard" count={Math.ceil(total / 20)} page={currentPage} onChange={gopage} />
                }
            </Container>
        </>
    );
}