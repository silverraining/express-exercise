const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();
const app = express();
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/items", (req, res) => {
  res.json([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ]);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack); // 에러 로그 기록 (중요!)

  // 에러 종류에 따라 상태 코드와 메시지 분기 가능
  const statusCode = err.statusCode || 500;
  const message = err.message || "서버 내부 오류가 발생했습니다.";
  res.status(statusCode).json({
    status: "error",
    message: message,
    // 개발 환경에서만 스택 정보 포함 (선택 사항)
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});
