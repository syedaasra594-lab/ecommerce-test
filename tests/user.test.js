const request = require("supertest");
const app = require("../app");
const pool = require("../db");

describe("POST /users Integration Test", () => {

  afterAll(async () => {
    // cleanup test data
    await pool.query("DELETE FROM users WHERE email = $1", [
      "testuser@example.com",
    ]);

    await pool.end();
  });

  test("should create user and store in DB", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        name: "Test User",
        email: "testuser@example.com",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("testuser@example.com");

    // verify in database
    const dbResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      ["testuser@example.com"]
    );

    expect(dbResult.rows.length).toBe(1);
    expect(dbResult.rows[0].name).toBe("Test User");
  });

});