import Header from '../components/header';
import Footer from '../components/footer';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MediaCard from '../components/media-card';
import SimpleSlider from '../components/welcome-hero';
import { useState } from 'react';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';


export default function dashboard({ exoplanets }) {
  
  

  if (!exoplanets) {
    return <p>Unable to fetch data... Please contact support@exoplanets</p>;
  }

  

  return (
    <div class="main">
      <Header title="Dashboard" />
      <Box sx={{ flexGrow: 1 }} className="grid-mt">
        <SimpleSlider />
        <Typography variant='h5'>
            <b>Trending Planets</b>
        </Typography>
        <Grid container spacing={2}>
          {exoplanets.map((exoplanet) => (
            <Grid item xs={4} key={exoplanet.id}>
              <MediaCard 
                exoplanet={exoplanet} 
                page="/exo-details" 
                onClick={() => handleCardClick(exoplanet.PLANET)} 
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />      
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch the data from the endpoint using fetch
    const res = await fetch('http://localhost:3000/api/getplanets-home');
    const exoplanets = await res.json();

    // Return the data as props
    return {
      props: { exoplanets },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { exoplanets: [] },
    };
  }
}

