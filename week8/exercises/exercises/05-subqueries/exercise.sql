-- Exercise 05: Subqueries
-- Databases: school.db and library.db

.headers on
.mode column

-- 5.1: Students with GPA above the average (school.db)

SELECT name, gpa
FROM students
WHERE gpa > (SELECT AVG(gpa) FROM students);

-- 5.2: Students enrolled in CS50 (use subquery) (school.db)

SELECT name
FROM students
WHERE id IN (
    SELECT student_id
    FROM enrollments
    WHERE course_id = (SELECT id FROM courses WHERE name = 'CS50')
);  

-- 5.3: Students NOT enrolled in CS50 (school.db)

SELECT name
FROM students
WHERE id NOT IN (
    SELECT student_id
    FROM enrollments    WHERE course_id = (SELECT id FROM courses WHERE name != 'CS50')
);

-- 5.4: Courses taught by the highest-paid teacher (school.db)

SELECT name
FROM courses
WHERE teacher_id = (
    SELECT id
    FROM teachers
    WHERE salary = (SELECT MAX(salary) FROM teachers)
);

-- 5.5: Students enrolled in 3 or more courses (subquery in FROM) (school.db)

SELECT name
FROM students
WHERE id IN (
    SELECT student_id
    FROM enrollments    GROUP BY student_id
    HAVING COUNT(course_id) >= 3
);

-- 5.6: Members who borrowed more than 2 books (library.db)

SELECT name
FROM members
WHERE id IN (
    SELECT member_id
    FROM loans    GROUP BY member_id
    HAVING COUNT(book_id) > 2
);

-- 5.7: Books with more pages than average (library.db)

SELECT title, pages FROM books
WHERE pages > (SELECT AVG(pages) FROM books);

-- 5.8: Students with at least one grade (EXISTS) (school.db)

SELECT name
FROM students s
WHERE EXISTS (
    SELECT 1
    FROM enrollments e
    WHERE e.student_id = s.id AND e.letter_grade IS NOT NULL
);

-- 5.9: Courses with no grades recorded (NOT EXISTS) (school.db)

SELECT name FROM courses c
WHERE NOT EXISTS (
    SELECT 1
    FROM enrollments e
    WHERE e.course_id = c.id AND e.letter_grade IS NOT NULL
);

-- 5.10 CHALLENGE: Course(s) with the most enrollments (no LIMIT) (school.db)

SELECT name FROM courses
WHERE id IN (
    SELECT course_id
    FROM enrollments
    GROUP BY course_id
    HAVING COUNT(student_id) = (
        SELECT MAX(enrollment_count)
        FROM (
            SELECT course_id, COUNT(student_id) AS enrollment_count
            FROM enrollments
            GROUP BY course_id
        )
    )
);
