import React, { useEffect, useState} from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import {exerciseOptions, fetchData } from  '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
    const [search, setSearch] = useState('');
    const [bodyParts, setBodyParts] = useState([]);
    const [searchError, setSearchError] = useState('');

    useEffect(() => {
        const fetchExercisesData = async () => {
            try {
                const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
                setBodyParts(['all', ...bodyPartsData]);
            } catch (error) {
                console.error('Error fetching body parts:', error);
            }
        }
        fetchExercisesData();
    }, []);

    const handleSearch = async () => {
        if (search) {
            setSearchError('');
            try {
                // Önce tüm egzersizleri çekelim
                let exercisesFound = await fetchData('https://exercisedb.p.rapidapi.com/exercises/name/' + search.toLowerCase(), exerciseOptions);
                console.log('Search term:', search);
                console.log('Total exercises found:', exercisesFound?.length || 0);

                if (!Array.isArray(exercisesFound)) {
                    exercisesFound = [];
                }

                if (exercisesFound.length > 0) {
                    setExercises(exercisesFound);
                    setSearch('');
                    setSearchError('');
                    window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
                } else {
                    // Eğer isimle bulunamazsa, hedef kas grubuna göre arayalım
                    exercisesFound = await fetchData('https://exercisedb.p.rapidapi.com/exercises/target/' + search.toLowerCase(), exerciseOptions);
                    
                    if (!Array.isArray(exercisesFound)) {
                        exercisesFound = [];
                    }
                    
                    console.log('Searching by target muscle:', exercisesFound.length, 'exercises found');
                    
                    if (exercisesFound.length > 0) {
                        setExercises(exercisesFound);
                        setSearch('');
                        setSearchError('');
                        window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
                    } else {
                        // Son olarak vücut bölgesine göre arayalım
                        exercisesFound = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPart/' + search.toLowerCase(), exerciseOptions);
                        
                        if (!Array.isArray(exercisesFound)) {
                            exercisesFound = [];
                        }
                        
                        console.log('Searching by body part:', exercisesFound.length, 'exercises found');
                        
                        if (exercisesFound.length > 0) {
                            setExercises(exercisesFound);
                            setSearch('');
                            setSearchError('');
                            window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
                        } else {
                            setExercises([]);
                            setSearchError('Sonuç bulunamadı. Lütfen başka bir terim deneyin.');
                        }
                    }
                }
            } catch (error) {
                console.error('Error during search:', error);
                setExercises([]);
                setSearchError('Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.');
            }
        } else {
            setSearchError('Lütfen bir arama terimi girin.');
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

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
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Egzersiz Ara (örn: biceps, chest, squat)"
                    type="text"
                    error={!!searchError}
                    helperText={searchError}
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

export default SearchExercises;
