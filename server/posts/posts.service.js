const axios = require('axios').default;

/**
 * Fetches posts from a remote API.
 * @async
 * @param {Object} [params] - The parameters for fetching posts.
 * @param {number} [params.start=0] - The start index of posts to fetch.
 * @param {number} [params.limit=10] - The maximum number of posts to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
async function fetchPosts(params) {
  const { start=0, limit = 10 } = params || {};
  const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts?limit',  //In this select the post title and content from this api. 
    {
      params: {
        _start: start,
        _limit: limit,
      },
    },
  );
   
  const postsWithImages = await Promise.all(
    posts.map(async (post) => {
      // console.log("check",post.id);
      // Fetch photos for the post using its ID as the album ID
      const { data: user } = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`); //Now here we are fetching the user details from the api.
      const { data: photos } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos?_limit=3`); //Now here instead of loading all photos we just load only three photos for each post.
    
      // console.log("photos",photos);
      return {
        ...post,
        user: {
          name: user.name,
          email: user.email,
        },
        images: photos.map((photo) => ({ url: photo.url })),
      };
    })
  );

  return postsWithImages;
}

module.exports = { fetchPosts };
