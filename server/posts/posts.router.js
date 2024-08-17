const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

// router.get('/', async (req, res) => {
  
//   const posts = await fetchPosts();

//   const postsWithImages = posts.reduce((acc, post) => {
//     // TODO use this route to fetch photos for each post
//     // axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
//     return [
//       ...acc,
//       {
//         ...post,
//         images: [
//           { url: 'https://picsum.photos/200/300' },
//           { url: 'https://picsum.photos/200/300' },
//           { url: 'https://picsum.photos/200/300' },
//         ],
//       },
//     ];
//   }, []);

//   res.json(postsWithImages);
// });

router.get('/', async (req, res) => {
  try {
    const postsWithImages = await fetchPosts(req.query);
    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts with images:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
