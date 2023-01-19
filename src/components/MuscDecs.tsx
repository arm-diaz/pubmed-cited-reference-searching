import { Box, Typography, Paper } from  "@mui/material"
import { useNavigate } from 'react-router-dom'
import musc from '../assets/musc.png'

export const MuscHeader = () => {
    const navigate = useNavigate()


    const handleImageClick = () => {
        navigate('/')
    }

    /*
    <Box display='flex' 
    sx={{
        backgroundColor:'white'}}>
    <img src={musc} height={100}  onClick={handleImageClick}/>
    </Box>

    */
    return (<>

      <Paper 
          elevation={4}         
          sx={{ 
                  color: 'white',
                  backgroundColor: 'white',
                  margin: '2px',
                  padding:'2px'}}
      >
          <Box id='heading1' display='flex' 
              sx={{
                  backgroundColor:'white',
                  color: 'black'}}
          >
              <Box display='flex' 
                  sx={{
                      backgroundColor:'white'}}>
              </Box>
              <Box display='flex' flex='1' flexDirection='column'>
                  <Typography 
                      textAlign='right'
                      width='100%'
                      color='primary.main'
                      component='div'
                  >
                      <Box>
                          Created by
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;  
                          Zach Moolman
                      </Box>
                      <Box>
                          Armando Diaz 
                      </Box>
                      <Box>
                          Julie Henderson
                      </Box>
                      <Box>
                          Kiersten Meeder
                      </Box> 
                      <Box>
                          Kevin S. Hughes, MD, FACS
                      </Box> 
                  </Typography>
              </Box>
              <Box display='flex' flex='1' flexDirection='column'>
                  <Typography 
                      textAlign='right'
                      width='100%'
                      color='primary.main'
                      component='div'
                  >
                      <Box>
                          Department of Surgery 
                      </Box>
                      <Box>
                          Division of Oncologic & Endocrine Surgery
                      </Box>
                      <Box>
                          Medical University of South Carolina
                      </Box>
                      <Box>
                       Cited Reference Searching Software
                      </Box>
                      <Box>
                          Supported in part by Invitae/Medneon
                      </Box>
                  </Typography>
              </Box>
          </Box>
      </Paper>
    </>)
}
