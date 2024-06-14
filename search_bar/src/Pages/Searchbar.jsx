import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { search } from './myslice';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Searchbar = () => {

    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState(''); // State For Search

    // Fetch Search Data
    const getSearchData = async () => {
        const response = await dispatch(search(searchQuery)); // Pass searchQuery to the search action
        return response?.payload;
    };

    // Query for Search Data
    const { data: searchData } = useQuery({
        queryKey: ['searchData', searchQuery], // Include searchQuery in the queryKey
        queryFn: getSearchData,
        enabled: !!searchQuery, // Ensure search query is not empty before fetching data
    });

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <div style={{ position: 'relative', width: '300px' }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onSubmit={(e) => e.preventDefault()}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Search>

                {searchQuery && searchData?.length !== 0 && (
                    <div style={{ position: 'absolute', top: 'calc(100% + 5px)', left: 0, width: '100%', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 10, maxHeight: '200px', overflowY: 'auto' }}>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {searchData?.map((value, index) => (
                                <li key={index} style={{ padding: '10px', borderBottom: '1px solid #eee', color: 'black' }}>
                                    <img src={value?.thumbnail} alt="" style={{height:'100px'}} />
                                    <p>{value?.title}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {searchQuery && searchData?.length === 0 && (
                    <div style={{ position: 'absolute', top: 'calc(100% + 5px)', left: 0, width: '100%', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 10, padding: '10px', color: 'red' }}>
                        <p>Data Not Found</p>
                    </div>
                )}
            </div>

        </>
    )
}
export default Searchbar