import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, FormLabel, Stack } from 'react-bootstrap'
import Articles from './Articles'
import Header from './Header'

const LandingPage = () => {
    const baseUrl = 'https://hn.algolia.com/api/v1/';
    const initialSearch = 'search?tags=front_page';
    const [searchString, setSearchString] = useState(null);
    const [searchUrl, setSearchUrl] = useState('');
    const [hitsPerPage, setHitsPerPage] = useState(25);
    const [newSearch, setNewSearch] = useState(true);

    useEffect(() => {
        handleSearch();
    }, [searchUrl])

    const handleSearch = (e, articlesPerPage) => {
        if (!(articlesPerPage === hitsPerPage)) {
            if (e) { e.preventDefault() };
            if (articlesPerPage) {
                setHitsPerPage(articlesPerPage);
            } else {
                articlesPerPage = hitsPerPage;
            };
            setNewSearch(true)
            !searchString && searchString !== '' ?
                (
                    setSearchUrl(`${baseUrl}${initialSearch}&hitsPerPage=${hitsPerPage}`)
                ) : (
                    setSearchUrl(`${baseUrl}search?query=${searchString}&hitsPerPage=${hitsPerPage}`)
                )
            // console.log(`Articles: ${articlesPerPage}`);
            // console.log(`Hits: ${hitsPerPage}`);
        }
    }

    return (
        <>
            <header className='text-center sticky-top mb-3'>
                <Header />
            </header>
            <main className='w-75 mx-auto text-center'>
                <Form onSubmit={handleSearch}>
                    <Stack direction='horizontal'>
                        <FormLabel className='me-2' hidden><h2>Search</h2></FormLabel>
                        <FormControl
                            id='searchField'
                            type='text'
                            placeholder='Enter your keyword(s) here'
                            onChange={e => setSearchString(e.target.value)}
                        />
                        <Button id='searchButton' type='submit'><FontAwesomeIcon icon={faSearch} /></Button>
                    </Stack>
                </Form>
                <Articles search={searchUrl} newSearch={newSearch} />
            </main>
        </>
    )
}

export default LandingPage