CREATE TABLE siteconfigurations
(
    id SERIAL PRIMARY KEY,
    allow_site_comments BOOL NOT NULL
);

CREATE TABLE posts
(
    id VARCHAR PRIMARY KEY,
    title VARCHAR NOT NULL,
    short_content TEXT NOT NULL,
    allow_comments BOOL NOT NULL,
    amount_of_likes INTEGER NOT NULL,
    creation_time DATE NOT NULL DEFAULT CURRENT_DATE,
    views INTEGER NOT NULL
);

CREATE TABLE comments
(
    id SERIAL PRIMARY KEY,
    author VARCHAR NOT NULL,
    content TEXT NOT NULL,
    creation_time DATE NOT NULL DEFAULT CURRENT_DATE,
    post_id VARCHAR NOT NULL REFERENCES posts(id)
);
