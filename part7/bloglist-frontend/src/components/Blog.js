import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, user, addLikeHandler }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [viewFullDetails, setviewFullDetails] = useState("view");

  const toggleView = () => {
    if (viewFullDetails === "view") {
      setviewFullDetails("hide");
    } else setviewFullDetails("view");
  };

  const addLike = async () => {
    const newBlog = { ...blog };
    addLikeHandler(newBlog);
  };

  const deleteBlog = async () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogService.deleteBlog(blog);
        blogService.getAll().then((blogs) => {
          blogs.sort((a, b) => b.likes - a.likes);
          setBlogs(blogs);
        });
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  if (viewFullDetails === "view") {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <Button handleClick={toggleView} text={viewFullDetails} />
      </div>
    );
  }

  return (
    <div className="blog-box" style={blogStyle}>
      {blog.title} <Button handleClick={toggleView} text={viewFullDetails} />
      <br />
      {blog.url}
      <br />
      likes: {blog.likes} <Button handleClick={addLike} text={"like"} />
      <br />
      {blog.author}
      <br />
      {blog.user.username === user.username ? (
        <Button handleClick={deleteBlog} text={"delete"} />
      ) : null}
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

export default Blog;
