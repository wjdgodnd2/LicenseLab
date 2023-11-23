const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // cors 미들웨어 추가

const app = express();
const port = 3000;

// SQLite 데이터베이스 연결
const db = new sqlite3.Database('mydatabase.db');

// 테이블 생성 (posts 테이블 생성)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      writer TEXT,
      password TEXT,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Express 미들웨어 설정
app.use(express.json());
app.use(cors()); // cors 미들웨어 적용

// 게시물 목록 가져오기
app.get('/api/posts', (req, res) => {
  db.all('SELECT * FROM posts', (err, rows) => {
    if (err) {
      console.error('게시물 선택 중 오류 발생:', err.message);
      res.status(500).json({ error: '내부 서버 오류' });
    } else {
      res.json(rows);
    }
  });
});

// 새 게시물 생성
app.post('/api/posts', (req, res) => {
  const { title, writer, password, content } = req.body;

  if (!title || !writer || !password || !content) {
    return res.status(400).json({ error: '모든 필드를 입력하세요.' });
  }

  db.run(
    'INSERT INTO posts (title, writer, password, content) VALUES (?, ?, ?, ?)',
    [title, writer, password, content],
    function (err) {
      if (err) {
        console.error('게시물 삽입 중 오류 발생:', err.message);
        res.status(500).json({ error: '내부 서버 오류' });
      } else {
        res.json({ id: this.lastID });
      }
    }
  );
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
