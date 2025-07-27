import { Box, Container, Grid, LinearProgress, List, ListItem, ListItemText, Modal, Typography } from "@mui/material";
import type { PokemonDetails } from "../../types/pokemon";
import TypePokemon from "../typepokemon/typePokemon";
import EvolutionsChain from "../evolution-chain/evolutionchain";
import { Padding } from "@mui/icons-material";
import body_bg from "../../assets/body_bg.png";
import pokeball_white from '../../assets/pokebal_white.svg';

type PokemonDetailProps = {
  pokedetail: PokemonDetails;
  open: boolean;
  handleClose: () => void;
};
const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  outline: 'none',
  overflowY: 'auto',
  maxHeight: '80vh',
  
   width: { xs: '100%', sm: '90%', md: '80%', lg: '70%', xl: '60%' }


};

export function PokemonDetail({ pokedetail, open, handleClose }: PokemonDetailProps) {
  return (
    <Modal open={open} onClose={handleClose} >
      <Box sx={modalStyle}   >
        <Box sx={{backgroundColor:'#a81616ff', color:'#fff', height:'100px', display:'flex', alignItems:'center', textAlign:'center', paddingLeft:'10px'}}>
        <img src={pokeball_white} height={100}></img>  
        <Typography variant="h4" gutterBottom>
          N.{pokedetail.id} {pokedetail.name}
        </Typography>
        </Box>
      <Container maxWidth="lg" style={{ padding: '20px', backgroundColor:'#414141ff' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', backgroundImage: `url(${body_bg})`, padding: 2, borderRadius: 2, color: '#fff' }}>
        <Grid container spacing={9} sx={{ }}>
          <Grid size={{ xs: 12, sm: 6, md: 4}}>
            <Box sx={{ display: 'flex' , justifyContent: 'center', border: '1px solid #ccc', borderRadius: 2, padding: 2, backgroundColor: '#f0f0f0ff' }}>
              <img
                src={pokedetail.sprites?.other?.["official-artwork"]?.front_default}
                alt={pokedetail.name}
                style={{ width: 200, height: 200 }}
                />
              
            </Box>

          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box>

              <Typography variant="body1" paragraph>
                <strong>Altura:</strong> {pokedetail.height / 10} m
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Peso:</strong> {pokedetail.weight / 10} kg
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Experiencia Base:</strong> {pokedetail.base_experience}
              </Typography>
            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'initial', gap: 2 }}>
                {pokedetail.types?.map((type, index) => (
                  
                  <TypePokemon key={index} url={type.type.url} />
                  
                ))}
             
            </Box>

            </Box>

          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} >
            <Box >
              {pokedetail.stats?.map((stats, index)=>(
                <div key={index}>

                  <Typography  color="#ffff"> {stats.stat.name}: <Typography variant="caption"> {stats.base_stat}</Typography>  </Typography> <LinearProgress  variant="determinate" color="error" value={stats.base_stat} />
                </div>

              ))}
            </Box>

          </Grid>
        </Grid>
        </Box>
        <EvolutionsChain url={pokedetail.species?.url} />
      </Container>
      </Box>
    </Modal>
  );
}