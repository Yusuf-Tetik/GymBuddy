import React from 'react'
import { Box, Stack , Typography, Button} from '@mui/material';

import HeroBannerImage from '../assets/images/banner.png'

const HeroBanner = () => {
  return (
    <Box sx={{ mt: { lg: '212px', xs: '70px' }, ml: { sm: '50px' } }} position="relative" p="20px">
      
      <Typography  color="#FF2625" fontWeight={800} fontSize="26px"> GYM BUDDY </Typography>
      <Typography fontWeight={600} sx={{ fontSize: { lg: '44px', xs: '40px' } }} mb="23px" mt="30px">
      Yapmak istediğiniz egzersizlerin <br/> en doğru şeklini öğrenin!
      </Typography>
      <Typography fontSize="22px" lineHeight="35px" mb={3}>
        Senin Spor Asistanın <br /> <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>Gym Buddy</span> ile tanışın,
        <br /> <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>Gym Buddy</span> ile spor yapmanın keyfini çıkarın.
      </Typography>
      <Typography 
      fontWeight={600}
      color="#FF2625" sx={{ opacity: 0.1 }} fontSize="150px" mb="23px" mt="30px">
        Work Hard
      </Typography>
      <Button variant="contained" color="error" href="#exercises" sx={{ backgroundColor: '#FF2625', padding: '10px' }}>
        Explore Exercises
      </Button>
      <img 
        src={HeroBannerImage} 
        alt="banner" 
        className="hero-banner-img" 
        style={{ position: 'absolute', right: '-120px', top: '50px' }} 
      />
    </Box>
    /* Burdaki yazıları değiştir sonra */
  )
}

export default HeroBanner
