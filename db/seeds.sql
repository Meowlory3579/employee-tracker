INSERT INTO department (dept_name)
VALUES  ('Partner Relations'),
        ('Client Relations'),
        ('Engineering'),
        ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Partner Relationship Manager', 90000, 1),
        ('Partner Implementation Manager', 75000, 1),
        ('Client Relationship Manager', 80000, 2),
        ('Client Implementation Manager', 65000, 2),
        ('Lead Engineer', 150000, 3),
        ('Software Engineer', 100000, 3),
        ('Salesperson', 80000, 4);       

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
    ('Hermione', 'Granger', 1, NULL),
    ('Harry', 'Potter', 2, 1),
    ('Albus', 'Dumbledore', 3, NULL),
    ('Ron', 'Weasley', 4, 3),
    ('Rubeus', 'Hagrid', 5, NULL),
    ('Severus', 'Snape', 6, 5),
    ('Minerva', 'McGonagall', 7, NULL);