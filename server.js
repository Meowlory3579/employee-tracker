// Packages required for this application
const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'GkSHTkHzE#0ZepcNvV8BH',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)

);

executeAction();

// Function to prompt user
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
                    // Execute
                    break;
                case 'Add an employee':
                    // Execute
                    break;
                case 'Update an employee role':
                    // Execute
                    break;
            }
        })
};

function allDepartments() {
    db.query(`SELECT * FROM department`,
        function (err, results) {
            if (err) {
                console.log(err);
            }
            console.table(results);
        })
    executeAction();
};

function allRoles() {
    db.query(`SELECT roles.id, roles.title, roles.salary, department.dept_name AS department 
    FROM roles 
    JOIN department ON roles.department_id = department.id`, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
    })
    executeAction();
};

function allEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.dept_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            LEFT JOIN employee manager ON employee.manager_id = manager.id
            INNER JOIN roles ON employee.role_id = roles.id
            INNER JOIN department ON roles.department_id = department.id`,
        function (err, results) {
            if (err) {
                console.log(err);
            }
            console.table(results);
        })
    executeAction();
};

function addDepartment(departmentName) {
    db.query('INSERT INTO department (dept_name) VALUES (?)', [departmentName],
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Added ${departmentName} to the database`);
                executeAction();
            }
        })
};



