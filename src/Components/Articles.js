import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Accordion, Stack } from 'react-bootstrap';
import { format } from 'date-fns';

let loading = false;

const Articles = (props) => {
  const [articles, setArticles] = useState(null);
  const [httpStatus, setHttpStatus] = useState(null);

  useEffect(() => {
    if (props.search) {
      console.log(props.search);
      loading = true;
      axios.get(props.search).then(res => {
        setArticles(res.data.hits);
        setHttpStatus(res.status);
        console.log(res);
        console.log(`Number of results: ${res.data.nbHits}`);
        console.log(`Hits per Page: ${res.data.hitsPerPage}`);
        console.log(`Number of Page(s): ${res.data.nbPages}`);
        loading = false;
      }).catch(err => {
        alert(err.message);
      });
    } else {
      loading = false;
      setHttpStatus(null);
    }
  }, [props.search, props.articlesPerPage, loading, httpStatus]);

  const resultParam = () => {
    if (loading) {
      return ('loading');
    } else if (httpStatus === 200 && articles.length === 0) {
      return ('noResult');
    } else if (httpStatus === 200 && articles) {
      return ('ok')
    } else if (httpStatus === null) {
      return ('start');
    } else {
      return ('error');
    }

  }


  return (
    <>
      {resultParam() === 'loading' ? (<div className='bg-white'>Loading...</div>) : (
        resultParam() === 'noResult' ? (<div className='bg-white'>Sorry, no results available</div>) : (
          resultParam() === 'start' ? (<div className='bg-white'>Please use the search bar</div>) : (
            resultParam() === 'error' ? (<div className='bg-white'>Sorry, an Error occured!</div>) : (
              articles.map(article => {
                return (
                  <Accordion className='border my-3 shadow'>
                    <Accordion.Header>
                      <Stack direction="horizontal" gap={3}>
                        <h3 className='cardHeader me-2 text-nowrap'>{format(new Date(article.created_at), 'yyyy-MM-dd')}</h3>
                        <h3>{article.title}</h3>
                      </Stack>
                    </Accordion.Header>
                    <Accordion.Body className='bg-white'>
                      {article.story_text ? (
                        <h4>Articletext:<br />
                          <p>{article.story_text}</p>
                        </h4>
                      ) : ''}
                      <p>Author: {article.author}</p>
                      <p>Link: <a href={`${article.url}`} target='_blank'>Link</a></p>
                    </Accordion.Body>
                  </Accordion>
                );
              })
            )
          )
        )
      )
      }
    </>
  )
}

export default Articles