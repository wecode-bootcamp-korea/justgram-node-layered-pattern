const request = require("supertest");
const { createApp } = require("../app");

const { DataSource } = require('typeorm')

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

describe("User sign up test", () => {

	let app;

	beforeAll(async () => {
		app = createApp();
		await myDataSource.initialize();
	})

	afterAll(async () => {
		await myDataSource.query(`TRUNCATE users`)
		await myDataSource.destroy()
	})

	test("SUCCESS: created user", async () => {
    await request(app)
      .post("/users/signup")
      .send({ data: { email: "wecode001@gmail.com", password: "password001@" } })
      .expect(201);
  });
})