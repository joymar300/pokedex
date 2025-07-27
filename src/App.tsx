import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './layouts/home/home'
import body_bg from "./assets/body_bg.png";


function App() {
  const [count, setCount] = useState(0)
   const theme = createTheme({
     typography: {
      fontFamily: 'Bitcount Prop Single, "Segoe UI"',
      
  },

   });

   const estilo ={
     backgroundImage: `url(${body_bg})`,
 

   }
  
  return (
    <div className="App" style={estilo}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route  path="/" element={<Home/>}/>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>  
      </StyledEngineProvider>
    </div>
  )
}

export default App
