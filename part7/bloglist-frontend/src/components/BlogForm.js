import { useState } from "react";

const BlogForm = (props) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    let newBlog = {
      title: title,
      author: author,
      url: url,
    };
    props.createBlog(newBlog);

    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            id="title-id"
            value={title}
            onChange={handleTitleChange}
            placeholder="write title here"
          />
          <br />
          author:{" "}
          <input
            id="author-id"
            value={author}
            onChange={handleAuthorChange}
            placeholder="write author here"
          />
          <br />
          url:{" "}
          <input
            id="url-id"
            value={url}
            onChange={handleUrlChange}
            placeholder="write url here"
          />
          <br />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  );
};

export default BlogForm;
