import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';

const Articles = (props) => {
  const [baseUrl, setBaseUrl] = useState('http://hn.algolia.com/api/v1/search?query=');
  

  useEffect(() => {
    const completeUrl = `${baseUrl}${props.search}`;
    console.log(completeUrl);
  }, [props]);
  return (
    <>
      <div>Articles</div>

    </>
  )
}

export default Articles