CREATE TABLE siteconfigurations
(
    id SERIAL PRIMARY KEY,
    allow_site_comments BIT NOT NULL
);

CREATE TABLE posts
(
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    content TEXT NOT NULL,
    short_content TEXT NOT NULL,
    allow_comments BIT,
    amount_of_likes NUMERIC NOT NULL,
    creation_time TIME NOT NULL,
    views INTEGER NOT NULL
);

CREATE TABLE comments
(
    id SERIAL PRIMARY KEY,
    author VARCHAR NOT NULL,
    content TEXT NOT NULL,
    creation_time TIME NOT NULL,
    post_id INTEGER NOT NULL REFERENCES posts(id)
);
