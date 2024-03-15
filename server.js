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

doTheNeedful();

// Function to prompt user
function doTheNeedful() {
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
                    doTheNeedful()
                    break;
                case 'View all roles':
                    allRoles();
                    doTheNeedful()
                    break;
                case 'View all employees':
                    // Execute a function
                    break;
                case 'Add a department':
                    // Execute
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

// Query database
function allDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
    })
};

function allRoles() {
    db.query('SELECT roles.id, roles.title, roles.salary, department.dept_name AS department FROM roles JOIN department ON roles.department_id = department.id', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
    })
}; 