// Packages required for this application
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Establish connection to the MySQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
);

// Start the application by prompting the user for their action
executeAction();

// Main function to prompt user for their action
function executeAction() {
    inquirer
        .prompt({
            type: 'list',
            name: 'selection',
            message: 'Please make a selection',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit'
            ]
        })
        .then(answers => {
            switch (answers.selection) {
                // Call respective functions based on user selection
                case 'View all departments':
                    allDepartments();
                    break;
                case 'View all roles':
                    allRoles();
                    break;
                case 'View all employees':
                    allEmployees();
                    break;
                case 'Add a department':
                    // Prompt for department details
                    inquirer
                        .prompt([{
                            name: 'deptName',
                            type: 'input',
                            message: 'What is the name of the department?',
                        }])
                        .then(answer => {
                            addDepartment(answer.deptName)
                        });
                    break;
                case 'Add a role':
                    // Fetch departments and prompt for role details
                    db.query('SELECT * FROM department', (err, departments) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        inquirer
                            .prompt([
                                {
                                    name: 'title',
                                    type: 'input',
                                    message: 'What is the title of the role?',
                                },
                                {
                                    name: 'salary',
                                    type: 'number',
                                    message: 'What is the salary of the role?',
                                },
                                {
                                    name: 'departmentId',
                                    type: 'list',
                                    choices: departments.map(department => ({
                                        name: department.dept_name,
                                        value: department.id,
                                    })),
                                    message: 'Which department does the role belong to?',
                                }
                            ])
                            .then(answer => {
                                addRole(answer.title, answer.salary, answer.departmentId);
                            });
                    });
                    break;
                case 'Add an employee':
                    // Fetch roles and managers, then prompt for employee details
                    db.query('SELECT id, title FROM roles', (err, roles) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        const roleChoices = roles.map(role => ({
                            name: role.title,
                            value: role.id,
                        }));

                        db.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`, (err, managers) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            const managerChoices = managers.map(manager => ({
                                name: manager.name,
                                value: manager.id,
                            }));
                            managerChoices.unshift({ name: 'None', value: null });

                            inquirer
                                .prompt([
                                    {
                                        name: 'employeeFirst',
                                        type: 'input',
                                        message: "What is the employee's first name?",
                                    },
                                    {
                                        name: 'employeeLast',
                                        type: 'input',
                                        message: "What is the employee's last name?",
                                    },
                                    {
                                        name: 'roleId',
                                        type: 'list',
                                        message: "What is the employee's role?",
                                        choices: roleChoices,
                                    },
                                    {
                                        name: 'managerId',
                                        type: 'list',
                                        message: "Who is the employee's manager?",
                                        choices: managerChoices,
                                    },
                                ])
                                .then(answer => {
                                    addEmployee(answer.employeeFirst, answer.employeeLast, answer.roleId, answer.managerId);
                                });
                        });
                    });
                    break;
                case 'Update an employee role':
                    // Fetch employees and roles, then prompt for updating an employee role
                    db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee', (err, employees) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        const employeeChoices = employees.map(employee => ({
                            name: employee.name,
                            value: employee.id,
                        }));

                        db.query('SELECT id, title FROM roles', (err, roles) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            const roleChoices = roles.map(role => ({
                                name: role.title,
                                value: role.id,
                            }));

                            inquirer
                                .prompt([
                                    {
                                        name: 'employeeId',
                                        type: 'list',
                                        message: "Which employee's role do you want to update?",
                                        choices: employeeChoices,
                                    },
                                    {
                                        name: 'newRoleId',
                                        type: 'list',
                                        message: "What is the new role?",
                                        choices: roleChoices,
                                    },
                                ])
                                .then(answer => {
                                    updateEmployeeRole(answer.employeeId, answer.newRoleId);
                                });
                        });
                    });
                    break;
            }
        })
};

// Fetch and display all departments
function allDepartments() {
    db.query(`SELECT * FROM department`,
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.table(results);
                executeAction(); // Return to Main Menu
            }
        }
    )

};

// Fetch and display all roles
function allRoles() {
    db.query(`SELECT roles.id, roles.title, roles.salary, department.dept_name AS department 
    FROM roles 
    JOIN department ON roles.department_id = department.id`,
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.table(results);
                executeAction(); // Return to Main Menu
            }
        }
    )
};

// Fetch and display all employees
function allEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.dept_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            LEFT JOIN employee manager ON employee.manager_id = manager.id
            INNER JOIN roles ON employee.role_id = roles.id
            INNER JOIN department ON roles.department_id = department.id`,
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.table(results);
                executeAction(); // Return to Main Menu
            }
        }
    )

};

// Add a new department to the database
function addDepartment(departmentName) {
    db.query(`INSERT INTO department (dept_name) VALUES (?)`,
        [departmentName],
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Added ${departmentName} to the database`);
                executeAction(); // Return to Main Menu
            }
        }
    )
};

// Add a new role to the database
function addRole(title, salary, departmentId) {
    db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
        [title, salary, departmentId],
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Added ${title} role to the database`);
                executeAction(); // Return to Main Menu
            }
        }
    )
};

// Add a new employee to the database
function addEmployee(employeeFirst, employeeLast, roleId, managerId) {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [employeeFirst, employeeLast, roleId, managerId === 'None' ? null : managerId],
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Added employee ${employeeFirst} ${employeeLast} to the database`);
                executeAction(); // Return to Main Menu
            }
        }
    )
};

// Update an employee's role in the database
function updateEmployeeRole(employeeId, newRoleId) {
    db.query(`UPDATE employee SET role_id = ? WHERE id = ?`,
        [newRoleId, employeeId],
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log("Employee's role updated successfully.");
                executeAction(); // Return to Main Menu
            }
        }
    )
};