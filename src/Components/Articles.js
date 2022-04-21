import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { Accordion, Stack } from 'react-bootstrap';
import { format } from 'date-fns';
import Pageinate from './Pageinate';

let loading = false;
let numPages = 1;
let currentPage = 0;
let numHits;

const Articles = (props) => {
  const [articles, setArticles] = useState(null);
  const [httpStatus, setHttpStatus] = useState(null);
  const [loadMore, setLoadMore] = useState(false);


  useEffect(() => {
    console.log(props.search);

    getData();
  }, [props.search, loadMore]);

  const getData = () => {
    if (currentPage < numPages) {
      if (props.search) {
        console.log(`LoadMore: ${loadMore}`);
        console.log(props.search);
        loading = true;
        axios.get(`${props.search}&page=${currentPage}`).then(res => {
          // console.log(res.data);
          const newArticles = res.data.hits;
          if (loadMore) {
            if (articles != null) {
              const currentArticles = articles;
              setArticles([...currentArticles, ...newArticles]);
            }
          } else {
            setArticles(newArticles);
            currentPage = 0;
            numPages = res.data.nbPages;
            numHits = res.data.nbHits;
          }
          console.log(res.data);
          currentPage = res.data.page + 1;
          console.log(`Current Page: ${currentPage}`);
          console.log(`Total Pages: ${numPages}`);
          setLoadMore(false);
          // console.log(loadMore);
          setHttpStatus(res.status);
          loading = false;
        }).catch(err => {
          alert(err.message);
        });

      } else {
        loading = false;
        setHttpStatus(null);
      }
    }
  }

  const resultParam = () => {
    if (loading) {
      return ('loading');
    } else if (httpStatus === 200 && articles.length === 0) {
      return ('noResult');
    } else if (httpStatus === 200 && articles) {
      // console.log(articles);
      return ('ok')
    } else if (httpStatus === null) {
      return ('start');
    } else {
      return ('error');
    }

  }

  const handleScroll = () => {
    const isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight;
    if (isAtBottom) {
      setLoadMore(true);
    }
  }

  window.addEventListener("scroll", handleScroll);

  return (
    <>
      <h2 className='articleHeader'>{numHits} Articles</h2>
      <Stack direction='horizontal' className='my-1 py-2 bg-white' hidden>
        <h3 className='bg-white p-2'>Page: </h3>
        <Pageinate pages={numPages} />
      </Stack>
      {resultParam() === 'loading' ? (<div className='bg-white'>Loading...</div>) : (
        resultParam() === 'noResult' ? (<div className='bg-white'>Sorry, no results available</div>) : (
          resultParam() === 'start' ? (<div className='bg-white'>Please use the search bar</div>) : (
            resultParam() === 'error' ? (<div className='bg-white'>Sorry, an Error occured!</div>) : (
              articles.map(article => {
                return (
                  <Accordion key={article.objectID} className='border my-3 shadow'>
                    <Accordion.Header>
                      <Stack direction="horizontal" gap={3}>
                        <Stack>
                          <h3>#{article.objectID}</h3>
                          <h3 className='cardHeader me-2 text-nowrap'>{format(new Date(article.created_at), 'yyyy-MM-dd')}</h3>
                        </Stack>
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