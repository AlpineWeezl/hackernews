import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, FormLabel, Stack } from 'react-bootstrap'
import Articles from './Articles'
import Header from './Header'

const LandingPage = () => {
    const [searchString, setSearchString] = useState('');
    const [startSignal, setStartSignal] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        startSignal ? setStartSignal(false) : setStartSignal(true);
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
                <h2>Articles</h2>
                <Articles search={searchString} signal={startSignal} />
            </main>
        </>
    )
}

export default LandingPage