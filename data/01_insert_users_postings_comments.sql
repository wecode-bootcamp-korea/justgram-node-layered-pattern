INSERT INTO users(id, username, password) VALUES
(1, 'soheon lee', 'aaaa'),
(2, 'jaejun jo', 'bbbb');

INSERT INTO postings(id, user_id, contents) VALUES
(1, 1, '할 수 있습니다'),
(2, 1, 'hello world!'),
(3, 2, 'Backend is awesome!');

INSERT INTO comments(id, user_id, posting_id, comment) VALUES
(1, 2, 1, 'Yes!!'),
(2, 2, 2, 'Hello!'),
(3, 2, 3, 'It is awesome!');
