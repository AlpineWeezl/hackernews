import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Button, Stack } from 'react-bootstrap'

const Header = () => {
    return (
        <Stack direction='horizontal' className='container-fluid justify-content-center'>
            <h1>YAHNP<br/>Yet Another Hacker News Page</h1>
            <Button className='ms-5 bg-warning border-dark text-dark' href='#'><FontAwesomeIcon icon={faArrowUp} /></Button>
        </Stack>
    )
}

export default Header