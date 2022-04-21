import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, FormLabel, Stack } from 'react-bootstrap'
import Articles from './Articles'
import Header from './Header'

const LandingPage = () => {
    const baseUrl = 'http://hn.algolia.com/api/v1/';
    const initialSearch = 'search?tags=front_page';
    const [searchString, setSearchString] = useState(null);
    const [searchUrl, setSearchUrl] = useState('');
    const [hitsPerPage, setHitsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(() => {
        searchString === null ? setSearchUrl(`${baseUrl}${initialSearch}&hitsPerPage=${hitsPerPage}`) : setSearchUrl(`${baseUrl}search?query=${searchString}&hitsPerPage=${hitsPerPage}`);
    }, [searchUrl])

    const handleSearch = (e) => {
        e.preventDefault();

        !searchString ? setSearchUrl(`${baseUrl}${initialSearch}`) : setSearchUrl(`${baseUrl}search?query=${searchString}`);
    }

    return (
        <>
            <header className='text-center'>
                <Header />
            </header>
            <main className='w-50 text-center mx-auto'>
                <Form onSubmit={handleSearch}>
                    <Stack direction='horizontal'>
                        <FormLabel className='me-2' hidden><h2>Search</h2></FormLabel>
                        <FormControl
                            id='searchField'
                            type='text'
                            placeholder='Enter your keyword(s) here'
                            onChange={e => setSearchString(e.target.value)}
                        />
                        <Button id='searchButton' type='submit'><FontAwesomeIcon icon={faSearch} ></FontAwesomeIcon></Button>
                    </Stack>
                </Form>
                <h2 className='articleHeader'>Articles</h2>
                <Stack id='hppContainer' direction='horizontal'>
                    <h3 id="hpp">Hits per page:</h3>
                    <Button onClick={() => {setHitsPerPage(10)}} className='hitsPerPage'>10</Button>
                    <Button onClick={() => {setHitsPerPage(25)}} className='hitsPerPage'>25</Button>
                    <Button onClick={() => {setHitsPerPage(50)}} className='hitsPerPage'>50</Button>
                </Stack>
                <Articles search={searchUrl} articlesPerPage={hitsPerPage} />
            </main>
        </>
    )
}

export default LandingPage