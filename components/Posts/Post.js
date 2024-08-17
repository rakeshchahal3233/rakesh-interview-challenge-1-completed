import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
  scrollSnapType: 'x mandatory'      
  
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));


const Button = styled.button(() => ({
  position: 'absolute',
  button:0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  top:'50%',                    //This is for fix the button position at center.
  transform: 'translateY(-50%)', 
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const InitialsCircle = styled.div(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#333333',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: 'bold',
  marginRight: '10px', // Spacing between the icon and the text
}));

const UserInfo = styled.div(() => ({
  display: 'flex',
  alignItems: 'center', // Align items vertically
  '& > div > p': {
    fontSize: '13px',
  },

}));


const Post = ({ post }) => {
  const carouselRef = useRef(null);

  // console.log("check : ",post.user);

  const scrollAmount = 300;  //This is for scroll to new image. image width = 280px, 10px space form both side so 300

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getInitials = (name) =>{
    const [firstName, lastName] = name.split(' ');
    return `${firstName.charAt(0)}${lastName ? lastName.charAt(0):''}`;
  }; 

  return (
    <PostContainer>
       <Content>
         <UserInfo>
          <InitialsCircle>{getInitials(post.user.name)}</InitialsCircle>
          <div>
          <h4>{post.user.name}</h4>
          <p>{post.user.email}</p>
          </div>
         </UserInfo>
        </Content>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.arrayOf(  //Here fixed the warning that is image type related.
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
    title: PropTypes.any,
  }),
};

export default Post;
