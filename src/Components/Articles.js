import React, { useState } from 'react'
import { Form } from 'react-bootstrap';

const Articles = () => {
  const [baseUrl, setBaseUrl] = useState('http://hn.algolia.com/api/v1/search?query=``');

  return (
    <>
      <div>Articles</div>
      <Form>

      </Form>
    </>
  )
}

export default Articles