import React, { useEffect, useState} from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import {exerciseOptions, fetchData } from  '../utils/fetchData'; // Assuming fetchData is a utility function to fetch data
import HorizontalScrollbar from './HorizontalScrollbar'; // Assuming this is a component to display body parts



const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {

    const [search, setseacrh] = useState('');
    const [bodyParts, setBodyParts] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

            setBodyParts(['all', ...bodyPartsData]);

        }
        fetchExercises();
    }, []);

    const handleSearch = async () => {
    if (search) {
     const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
     
     const searchedExercises = exercisesData.filter(
        (exercise) => exercise.name.toLowerCase().includes(search) || 
                      exercise.target.toLowerCase().includes(search) || 
                      exercise.equipment.toLowerCase().includes(search) || 
                      exercise.bodyPart.toLowerCase().includes(search)
      );
      setseacrh('');
      // Assuming there's a function to set the exercises in the parent component
      // setExercises(searchedExercises);
      setExercises(searchedExercises);
    }
  }

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="50px" textAlign="center">
        Hadi Durma
        <br />
        Egzersizleri Keşfetmeye Başla!
        <br />
        <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>Gym Buddy</span> ile tanışın
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: '800', border: 'none', borderRadius: '4px' },
            width: { lg: '800px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
          height="76px"
          value={search}
          onChange={(e) => setseacrh(e.target.value.toLowerCase())}
          placeholder="Egzersiz Ara"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '175px', xs: '80px' }, fontSize: { lg: '20px', xs: '14px' }, height: '56px', position: 'absolute', right: '0' }}
          onClick={handleSearch}
        >
          Ara
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
      </Box>
    </Stack>
  )
}

export default SearchExercises
