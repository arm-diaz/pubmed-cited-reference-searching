import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box, createTheme, ThemeProvider } from '@mui/material'

import './App.css'

import ArticleFind from './components/ArticleFind';
  
const theme = createTheme({

    typography: { 
        fontFamily: 'Libre Franklin',
        allVariants: { fontWeight:  600} 
  }
})

export const App = () => {  

  return (<>
    <ThemeProvider theme={theme}>      
      <Router>
          <Box
              id='workspace'
              marginTop='10px'
              sx={{
                  splay: 'flex',
                  color: 'white',
                  height: 'calc(100vh - 145px)',
                  direction: 'column',
                  gap: '5px 5px',
                  
              }} 
          >
            <Routes>
              <Route path='/' element={<ArticleFind/>}/>
            </Routes>
          </Box>
      </Router>
    </ThemeProvider>
  </>)
}

export default App;
