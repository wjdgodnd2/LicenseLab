// server.js

const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// SQLite 데이터베이스 연결
const db = new sqlite3.Database('database.db');

// 테이블 생성 쿼리
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    writer TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

// 데이터베이스에 테이블 생성
db.run(createTableQuery);

// Middleware 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 게시글 목록 조회
app.get('/api/posts', (req, res) => {
  const query = 'SELECT * FROM posts ORDER BY created_at DESC';

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// 게시글 등록
app.post('/api/posts', (req, res) => {
  const { title, writer, content } = req.body;
  const query = 'INSERT INTO posts (title, writer, content) VALUES (?, ?, ?)';

  db.run(query, [title, writer, content], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ id: this.lastID });
    }
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
