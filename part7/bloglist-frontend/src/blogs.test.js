import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";

describe("<Blog />", () => {
  let blog;
  let blogForm;

  let sampleBlog = {
    title: "test title",
    author: "ramez",
    url: "website.com",
    likes: 515,
    user: "63cd7a36469dc63a52f05ad8",
  };

  let sampleUser = {
    username: "ramez",
    name: "name",
    id: "63cd7a36469dc63a52f05ad8",
  };

  let mockLikeHandler = jest.fn();
  let mockCreateHandler = jest.fn();

  beforeEach(() => {
    blog = render(
      <Blog
        blog={sampleBlog}
        addLikeHandler={mockLikeHandler}
        user={sampleUser}
      />,
    );
    blogForm = render(<BlogForm createBlog={mockCreateHandler} />);
  });

  test("test 5.13 - blog displays only title and author at the beginning", () => {
    expect(blog.container).toHaveTextContent(sampleBlog.title);
    expect(blog.container).toHaveTextContent(sampleBlog.author);
    expect(blog.container).not.toHaveTextContent(sampleBlog.likes);
    expect(blog.container).not.toHaveTextContent(sampleBlog.url);
  });

  test("test 5.14 - blog displays all fields after clicking the view button", async () => {
    const button = blog.getByText("view");

    const user = userEvent.setup();
    await user.click(button);

    expect(blog.container).toHaveTextContent(sampleBlog.likes);
    expect(blog.container).toHaveTextContent(sampleBlog.url);
  });

  test("test 5.15 - clicking likes twice results in calling the event handler twice", async () => {
    const viewButton = blog.getByText("view");

    const user = userEvent.setup();
    await user.click(viewButton);

    const likeButton = blog.getByText("like");

    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockLikeHandler.mock.calls).toHaveLength(2);
  });

  test("test 5.16 - blogform calls the handler and passes the write data after clicking create", async () => {
    const user = userEvent.setup();
    const title = screen.getByPlaceholderText("write title here");
    const url = screen.getByPlaceholderText("write url here");
    const author = screen.getByPlaceholderText("write author here");

    await userEvent.type(title, "testing a form...");
    await userEvent.type(url, "testing a form...");
    await userEvent.type(author, "testing a form...");

    const createButton = blogForm.getByText("create");
    await user.click(createButton);

    expect(mockCreateHandler.mock.calls).toHaveLength(1);
    expect(mockCreateHandler.mock.calls[0][0].title).toBe("testing a form...");
    expect(mockCreateHandler.mock.calls[0][0].url).toBe("testing a form...");
    expect(mockCreateHandler.mock.calls[0][0].author).toBe("testing a form...");
  });
});
