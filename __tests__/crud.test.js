"use strict";

const server = require("../server");

const supertest = require("supertest");

const request = supertest(server.app);

describe("test for API server", () => {
  it("testing get all post", async () => {
    const response = await request.get("/post");
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });
  it("testing chosen post", async () => {
    const response = await request.get("/post/1");
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });
});

describe("test create post", () => {
  it("testing", async () => {
    const response = await request
      .post("/post")
      .send({ postName: "facebook", postStatus: true });
    expect(response.status).toEqual(201);
    expect(typeof response.body).toEqual("object");
  });
});

describe("test delete post", () => {
  it("testing", async () => {
    let id = 1;
    const response = await request.delete(`/post/${id}`).send({});
    expect(response.status).toEqual(204);
    expect(typeof response.body).toEqual("object");
  });
});

// describe("test put post", () => {
//   it("testing", async () => {
//     let id = 1;
//     const response = await request
//       .put(`/post/${id}`)
//       .send({ postName: "new FaceBook", postStatus: true });
//     expect(response.status).toEqual(200);
//     expect(typeof response.body).toEqual("object");
//   });
// });
