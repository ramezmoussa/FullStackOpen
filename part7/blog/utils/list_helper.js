const logger = require("./logger");
const lodash = require("lodash");

const dummy = (blogs) => {
  logger.info(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  let mostLikes = blogs[0];
  let i;
  for (i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikes.likes) {
      mostLikes = blogs[i];
    }
  }
  logger.info(mostLikes);

  return mostLikes;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const groupedBlogs = lodash.groupBy(blogs, "author");
  let blogsPerAuthor = {};
  Object.keys(groupedBlogs).forEach(function (key) {
    blogsPerAuthor[key] = groupedBlogs[key].length;
  });

  const authors = lodash.keys(blogsPerAuthor);
  const highestAuthor = lodash.maxBy(
    authors,
    (author) => blogsPerAuthor[author],
  );
  return { author: highestAuthor, blogs: blogsPerAuthor[highestAuthor] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const groupedBlogs = lodash.groupBy(blogs, "author");
  let likesPerAuthor = {};

  Object.keys(groupedBlogs).forEach(function (key) {
    likesPerAuthor[key] = lodash.sumBy(groupedBlogs[key], "likes");
  });
  const authors = lodash.keys(likesPerAuthor);
  const highestAuthor = lodash.maxBy(
    authors,
    (author) => likesPerAuthor[author],
  );
  return { author: highestAuthor, likes: likesPerAuthor[highestAuthor] };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
