INSERT INTO department (name)
VALUES
('Associates'),
('Invetory Reps'),
('Department Managers'),
('Assistant Managers'),
('Store Manager');

INSERT INTO role (title, salary, department_id)
VALUES
('Associates',37000, 1),
('Invetory Reps',40000, 2),
('Department Managers',50000, 3),
('Assistant Managers', 67000, 4),
('Store Manager', 85000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Lennon', 1,  null),
('George', 'Harrison', 1,  null),
('Ringo', 'Starr', 1,  null),
('Paul', 'McCartney', 2,  null),
('Tyler', 'Wells', 2,  null),
('Tommy', 'Moore', 3,  2),
('George', 'Strait', 3,  3),
('Billy', 'Moss', 4,  null),
('Dante', 'Sparda', 4,  4),
('Johnny', 'Cash', 5, 5),
