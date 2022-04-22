import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'

const Pageinate = (props) => {
    useEffect(() => {
    }, [props.pages])

    const createPageButtons = (cpb) => {
        return cpb();
    };


    return (
        <>
            {
                createPageButtons(() => {
                    const pageButtons = [];
                    for (let i = 1; i <= props.pages; i++) {
                        if (i < 6 || (props.pages > 6 && i === props.pages)) {
                            pageButtons.push(<Button className='mx-2' key={`page${i}`}>{i}</Button>);
                        } else if (i === 7) {
                            pageButtons.push(<p><FontAwesomeIcon icon={faEllipsisH}/></p>)
                        }
                    }
                    return pageButtons;
                })
            }
        </>
    );

}

export default Pageinate