import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormControl, FormLabel, Row } from 'react-bootstrap'
import Articles from './Articles'
import Header from './Header'
import axios from 'axios'

const LandingPage = () => {
    const [searchString, setSearchString] = useState('');

    const handleSearch = (e) => {
        console.log(searchString);
    }

    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <h2>Search</h2>
                <Form>
                    <Container>
                        <Row>
                            <Col>
                                <FormLabel>Search</FormLabel>
                            </Col>
                            <Col>
                                <FormControl
                                    id='searchField'
                                    onChange={e => setSearchString(e.target.value )}
                                />
                            </Col>
                            <Col>
                                <Button onClick={handleSearch}><FontAwesomeIcon icon={faSearch} ></FontAwesomeIcon></Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                <Articles search={searchString} />
            </main>
        </>
    )
}

export default LandingPage