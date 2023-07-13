describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "ramez",
      username: "ramez",
      password: "ramez",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  describe("Login", function () {
    it("test 5.17 - login form is displayed by default", function () {
      cy.visit("http://localhost:3000");
      cy.contains("username");
      cy.contains("password");
      cy.contains("login");
      cy.get("input").its("length").should("eq", 2);
      cy.get("button").its("length").should("eq", 1);
    });

    it("test 5.18 - unsuccessful login", function () {
      cy.visit("http://localhost:3000");
      cy.get("#username").type("ramez");
      cy.get("#password").type("wrong_password");
      cy.get("#login-button").click();
      cy.contains("invalid username or password");
    });

    it("test 5.18 - successful login", function () {
      cy.visit("http://localhost:3000");
      cy.get("#username").type("ramez");
      cy.get("#password").type("ramez");
      cy.get("#login-button").click();
      cy.contains("ramez is logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "ramez",
        password: "ramez",
      }).then((response) => {
        localStorage.setItem(
          "loggedBlogappUser",
          JSON.stringify(response.body),
        );
        cy.visit("http://localhost:3000");
      });
    });

    it("test 5.19 - A blog can be created", function () {
      cy.get("button").contains("new blog").click();
      cy.get("#author-id").type("ramez");
      cy.get("#url-id").type("www.website.com");
      cy.get("#title-id").type("temporary title");
      cy.get("button").contains("create").click();
      cy.contains("temporary title ramez");
      cy.contains("view");

      // count number of view buttons, corresponding to the number of blogs. It should be now 1
      cy.get("button")
        .filter(':contains("view")')
        .its("length")
        .should("eq", 1);
    });

    it("test 5.20 - A blog can be liked", function () {
      cy.get("button").contains("new blog").click();
      cy.get("#author-id").type("ramez");
      cy.get("#url-id").type("www.website.com");
      cy.get("#title-id").type("temporary title");
      cy.get("button").contains("create").click();
      cy.get("button").contains("view").click();

      // confirm that a delete button exists
      cy.get("button")
        .filter(':contains("delete")')
        .its("length")
        .should("eq", 1);
      cy.contains("likes: 0");
      cy.get("button").contains("like").click();
      cy.contains("likes: 1");
    });

    it("test 5.21 - creator can delete their blog", function () {
      cy.get("button").contains("new blog").click();
      cy.get("#author-id").type("ramez");
      cy.get("#url-id").type("www.website.com");
      cy.get("#title-id").type("temporary title");
      cy.get("button").contains("create").click();
      cy.get("button").contains("view").click();

      // confirm that a delete button exists
      cy.get("button")
        .filter(':contains("delete")')
        .its("length")
        .should("eq", 1);
      cy.get("button").contains("delete").click();
    });

    it("test 5.22 - confirm blogs order is by likes ", function () {
      cy.createBlog({
        title: "middle likes",
        author: "ramez",
        url: "www.middle.com",
        likes: 20,
      });

      cy.createBlog({
        title: "lowest likes",
        author: "ramez",
        url: "www.lowest.com",
        likes: 10,
      });

      cy.createBlog({
        title: "highest likes",
        author: "ramez",
        url: "www.highest.com",
        likes: 30,
      });

      // click on all view buttons
      cy.get("button").contains("view").click();
      cy.get("button").contains("view").click();
      cy.get("button").contains("view").click();

      // check that first blog box has 30 likes, the second has 20 and the third has 10
      cy.get("div").filter(".blog-box").eq(0).contains("likes: 30");
      cy.get("div").filter(".blog-box").eq(1).contains("likes: 20");
      cy.get("div").filter(".blog-box").eq(2).contains("likes: 10");
    });
  });
});
