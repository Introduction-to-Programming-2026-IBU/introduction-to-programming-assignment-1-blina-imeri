-- Exercise 06: Database Design
-- Create a new database file for each exercise:
-- sqlite3 data/social.db < exercises/06-design/exercise.sql

.headers on
.mode column

-- ============================================================
-- 6.1 — Social Media Schema
-- ============================================================
-- Design entities: Users, Posts, Follows, Likes, Comments
-- Write your CREATE TABLE statements below:

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username  TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL, -- I know some are not given but I think are crucial. I even left some out.
    join_date TEXT,
    bio TEXT,
    profile_pic IMAGE,
    follower_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    last_active TEXT,
    post_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0
);

-- ============================================================
-- 6.2 — Movie Rental Schema
-- ============================================================
-- Entities: Genres, Movies, Copies, Customers, Rentals, Reviews
-- Write your CREATE TABLE statements below:

CREATE TABLE genres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT UNIQUE NOT NULL,
    release_date DATE,
    genre_id INTEGER,
    director TEXT,
    runtime INTEGER,
    rating REAL CHECK (rating >= 0 AND rating <= 10),
    description TEXT,
    poster_url TEXT,
    trailer_url TEXT,
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE TABLE copies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id INTEGER NOT NULL,
    format TEXT NOT NULL, -- e.g. DVD, Blu-ray, Digital
    available INTEGER DEFAULT 1,
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);

CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    created_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE rentals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    copy_id INTEGER NOT NULL,
    rental_date DATE DEFAULT CURRENT_DATE,
    return_date DATE,
    due_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (copy_id) REFERENCES copies(id)
);

CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    rating REAL CHECK (rating >= 0 AND rating <= 10),
    comment TEXT,
    review_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- ============================================================
-- 6.3 — E-Commerce Schema
-- ============================================================
-- Entities: Categories, Products, Customers, Orders, OrderItems
-- Write your CREATE TABLE statements below:



-- ============================================================
-- 6.4 — Fix the Bad Schema
-- ============================================================
-- What's wrong with this? Write your fixed version:
--
-- CREATE TABLE student_data (
--     info TEXT,
--     name_and_email TEXT,
--     courses TEXT,
--     gpa TEXT,
--     teacher_name TEXT,
--     teacher_salary TEXT
-- );
--
-- Problems identified:
-- 1. ...
-- 2. ...
-- 3. ...
-- Fixed schema:

CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    gpa REAL CHECK (gpa >= 0 AND gpa <= 4.0),
    teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

-- ============================================================
-- 6.5 — Seed Your Social Media Database
-- ============================================================
-- After creating tables in 6.1, insert sample data:

INSERT INTO users (username, email, bio) VALUES
('blina', 'blinaimeri@hotmail.com', 'just keep swimming'),
('john_doe', 'john.doe@email.com', 'loves coding');

-- Verification queries:
-- Q1: Who does user 1 follow?

SELECT u.username FROM users u JOIN follows f ON u.id = f.following_id WHERE f.follower_id = 1;

-- Q2: Most liked posts?

SELECT p.id, p.content, COUNT(l.id) AS like_count
FROM posts p
LEFT JOIN likes l ON p.id = l.post_id
GROUP BY p.id
ORDER BY like_count DESC
LIMIT 5;

-- Q3: User who posted the most?

SELECT u.username, COUNT(p.id) AS post_count
FROM users u
JOIN posts p ON u.id = p.user_id
GROUP BY u.id
ORDER BY post_count DESC
LIMIT 1;
