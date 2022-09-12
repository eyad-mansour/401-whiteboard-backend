"use strict";

const server = require("../server");

const supertest = require("supertest");

const request = supertest(server.app);

describe("test for API server", () => {
  it("testing home page", async () => {
    const response = await request.get("/");
    expect(response.text).toEqual("hello eyad");
  });
});

describe("test wronng url", () => {
  it("testing home page", async () => {
    const response = await request.get("/boom");
    expect(response.status).toEqual(404);
  });
});
