-- Exercise 07: Advanced SQL
-- Databases: school.db and library.db

.headers on
.mode column

-- 7.1: Create an index on students.gpa, then EXPLAIN QUERY PLAN

CREATE INDEX idx_students_gpa ON students(gpa);

-- Running query to see if the index is used:
SELECT * FROM students WHERE gpa > 3.5;

-- 7.2: Create view 'enrollment_details', then query for 'A' grades

CREATE VIEW enrollment_details AS 
SELECT s.first_name || ' ' || s.last_name AS student_name,
c.title AS course_name,
g.letter_grade
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id
JOIN grades g ON e.id = g.enrollment_id;

-- 7.3: Create view 'course_statistics' with count and avg final score

CREATE VIEW course_statistics AS 
SELECT c.title AS course_name,
COUNT(e.id) AS total_students,
AVG(g.final) AS average_final_score
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
LEFT JOIN grades g ON e.id = g.enrollment_id
GROUP BY c.id;

-- 7.4: Insert a new student (newstudent@school.edu, 2024, NULL gpa)

INSERT INTO students (first_name, last_name, email, enrollment_year, gpa) 
VALUES ('New', 'Student', 'newstudent@school.edu', 2024, NULL);

-- 7.5: Update student id=17 (Quinn Moore) to set gpa = 3.22

UPDATE students SET gpa = 3.22 WHERE id = 17;

-- 7.6: Preview and then DELETE all grades with letter_grade = 'F'
-- Step 1: SELECT to preview (run this first!)

SELECT g.id, s.first_name || ' ' || s.last_name AS student_name, c.title AS course_name, g.letter_grade
FROM grades g
JOIN enrollments e ON g.enrollment_id = e.id
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id
WHERE g.letter_grade = 'F';

-- Step 2: DELETE (uncomment when ready)

DELETE FROM grades WHERE letter_grade = 'F';

-- 7.7: Transaction to enroll student 1 in course 13 + add grade record

BEGIN TRANSACTION;

INSERT INTO enrollments (student_id, course_id, enrollment_date)
VALUES (1, 13, '2026-04-30');

INSERT INTO grades (enrollment_id, midterm, final, assignments, letter_grade)
VALUES (last_insert_rowid(), NULL, NULL, NULL, NULL);

COMMIT;

-- 7.8: Transaction: decrease available_copies for book 3, insert loan (library.db)

BEGIN TRANSACTION;

UPDATE books 
SET available_copies = available_copies - 1 
WHERE id = 3 AND available_copies > 0;

INSERT INTO loans (member_id, book_id, loan_date, due_date, return_date, fine)
VALUES (1, 3, '2026-04-30', '2026-05-14', NULL, 0);

COMMIT;

-- 7.9: EXPLAIN QUERY PLAN comparison
-- Run both and compare the output:

-- Version A (may not use index well):

SELECT * FROM students WHERE email LIKE '%@school.edu';

-- Version B (index-friendly):

SELECT * FROM students WHERE email LIKE 'alice%';

-- Your explanation of the difference (as a comment):
-- ...
-- The first query uses a wildcard at the beginning of the pattern, which prevents the use of an index. 
-- The second query uses a wildcard at the end, allowing the index to be utilized for faster lookups.


-- 7.10 CHALLENGE: Create compound index for enrollments(student_id, course_id)

CREATE INDEX idx_enrollments_student_course 
ON enrollments(student_id, course_id);

EXPLAIN QUERY PLAN
SELECT * FROM enrollments 
WHERE student_id = 1 AND course_id = 13;
