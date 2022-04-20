import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Accordion, Container, Row, Stack } from 'react-bootstrap';
import { format } from 'date-fns';

let loading = false;

const Articles = (props) => {
  const [baseUrl, setBaseUrl] = useState('http://hn.algolia.com/api/v1/search?query=');
  const [articles, setArticles] = useState(null);
  const [httpStatus, setHttpStatus] = useState(null);
  const [articlesPerPage, setArticlesPerPage] = useState(20);

  useEffect(() => {
    if (props.search) {
      loading = true;
      const completeUrl = `${baseUrl}${props.search}`;
      axios.get(completeUrl).then(res => {
        setArticles(res.data.hits);
        setHttpStatus(res.status);
        loading = false;
      }).catch(err => {
        alert(err.message);
      });
    }
  }, [props.signal, loading, httpStatus]);


  return (
    <>
      {!loading ? (
        articles != null ? (
          articles.map(article => {
            return (
              <Accordion className='border my-3 shadow'>
                <Accordion.Header>
                  <Stack direction="horizontal" gap={3}>
                    <h3 className='me-2 text-nowrap'>{format(new Date(article.created_at), 'yyyy-MM-dd')}</h3>
                    <h3>{article.title}</h3>
                  </Stack>
                </Accordion.Header>
                <Accordion.Body>
                  {article.story_text ? (
                    <p>Articletext:<br />
                      <p>{article.story_text}</p>
                    </p>
                  ) : ''}
                  <p>Author: {article.author}</p>
                  <p>Link: <a href={`${article.url}`}>Link</a></p>
                </Accordion.Body>
              </Accordion>
            );
          })
        ) : (
          (httpStatus === 200 || httpStatus === null) ? <div>Sorry, no results available</div> : <div>An Error occured</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default Articles