const request = require("supertest");
const app = require("../app"); // app.js 파일 경로에 맞게 수정하세요

describe("GET /", () => {
  it(`기본 경로(/)는 200 상태코드와 함께 "Hello World!"를 반환합니다.`, async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Hello World!");
  });
});
