const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// 데이터베이스 파일이 없으면 생성
if (!fs.existsSync('mydatabase.db')) {
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
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        views INTEGER DEFAULT 0
      )
    `);
  });

  db.close();
}

// SQLite 데이터베이스 연결
const db = new sqlite3.Database('mydatabase.db');

// Express 미들웨어 설정
app.use(express.json());
app.use(cors());

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

// 게시물 생성 시 현재 시간을 이용하여 ID 생성
app.post('/api/posts', (req, res) => {
  const { title, writer, password, content } = req.body;

  if (!title || !writer || !password || !content) {
    return res.status(400).json({ error: '모든 필드를 입력하세요.' });
  }

  const created_at = new Date().toISOString(); // 현재 시간을 ISO 형식으로 저장

  db.run(
    'INSERT INTO posts (title, writer, password, content, created_at) VALUES (?, ?, ?, ?, ?)',
    [title, writer, password, content, created_at],
    function (err) {
      if (err) {
        console.error('게시물 삽입 중 오류 발생:', err.message);
        res.status(500).json({ error: '내부 서버 오류' });
      } else {
        res.json({ id: created_at });
      }
    }
  );
});

// 게시물 수정
app.put('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const { title, writer, password, content } = req.body;

  if (!title || !writer || !content) {
    return res.status(400).json({ error: '제목, 글쓴이, 내용은 필수 입력 사항입니다.' });
  }

  // 비밀번호 검사 로직 추가
  db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, row) => {
    if (err) {
      console.error('게시물 조회 중 오류 발생:', err.message);
      return res.status(500).json({ error: '내부 서버 오류' });
    }

    if (!row) {
      return res.status(404).json({ error: '해당 ID의 게시물을 찾을 수 없습니다.' });
    }

    if (row.password !== password) {
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    // 비밀번호가 일치하면 게시물 수정
    db.run(
      'UPDATE posts SET title = ?, writer = ?, content = ? WHERE id = ?',
      [title, writer, content, postId],
      (err) => {
        if (err) {
          console.error('게시물 수정 중 오류 발생:', err.message);
          return res.status(500).json({ error: '내부 서버 오류' });
        }

        res.json({ id: postId });
      }
    );
  });
});

// 게시물 삭제
app.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const password = req.body.password;

  // 비밀번호 검사 로직 추가
  db.get('SELECT * FROM posts WHERE created_at = ?', [postId], (err, row) => {
    if (err) {
      console.error('게시물 조회 중 오류 발생:', err.message);
      return res.status(500).json({ error: '내부 서버 오류' });
    }
    if (!row) {
      return res.status(404).json({ error: '해당 ID의 게시물을 찾을 수 없습니다.' });
    }

    if (row.password !== password) {
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    // 비밀번호가 일치하면 게시물 삭제
    db.run('DELETE FROM posts WHERE created_at = ?', [postId], (err) => {
      if (err) {
        console.error('게시물 삭제 중 오류 발생:', err.message);
        return res.status(500).json({ error: '내부 서버 오류' });
      }

      res.json({ id: postId });
    });
  });
});

// 게시물 조회
app.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;

  db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, row) => {
    if (err) {
      console.error('게시물 조회 중 오류 발생:', err.message);
      return res.status(500).json({ error: '내부 서버 오류' });
    }

    if (!row) {
      return res.status(404).json({ error: '해당 ID의 게시물을 찾을 수 없습니다.' });
    }

    // 조회수 증가
    db.run('UPDATE posts SET views = views + 1 WHERE id = ?', [postId], (err) => {
      if (err) {
        console.error('조회수 증가 중 오류 발생:', err.message);
        // 오류가 발생해도 클라이언트에는 영향을 미치지 않도록 계속 진행
      }

      res.json(row);
    });
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
