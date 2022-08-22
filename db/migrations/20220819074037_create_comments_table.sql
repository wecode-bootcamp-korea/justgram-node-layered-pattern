-- migrate:up
CREATE TABLE comments (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	posting_id INT NOT NULL,
	comment VARCHAR(300),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (posting_id) REFERENCES postings(id)
);

-- migrate:down
DROP TABLE comments;

