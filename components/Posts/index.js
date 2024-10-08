import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import {WindowWidthContext} from '../context/WindowWidthContext'

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start,setStart] = useState(0);                 //This is used to load the next post.
  const [hasMorePosts,setHasMorePosts] = useState(true);

  const { isSmallerDevice } = useContext(WindowWidthContext);
  const limit = isSmallerDevice ? 5 : 10;

  const fetchPost = async (start) => {
    const { data: newPosts } = await axios.get('/api/v1/posts', {
      params: { start, limit},
    });

    setPosts((prevPosts)=>[...prevPosts,...newPosts]);

    if(newPosts.length<limit)
    {
      setHasMorePosts(false);
    }
  };

  useEffect(() => {
    fetchPost(0);
  }, [isSmallerDevice]);

  const handleClick = () => {
    setIsLoading(true)

    const newStart = start+limit;
    setStart(newStart);

    fetchPost(newStart).finally(()=>{
      setIsLoading(false);
    })

    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post,index) => (
          <Post post={post} key={index}/>
        ))}
      </PostListContainer>
                                                                {/* This is for loading button  */}
      {hasMorePosts && 
       <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>
       </div>
      }

    </Container>
  );
}
