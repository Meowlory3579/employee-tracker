// Packages required for this application
const inquirer = require('inquirer');
const fs = require('fs');

// Function to prompt user
function doTheNeedful() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'Please make a selection',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        })
        .then(answers => {
            switch (answers.action) {
                case 'View all departments':
                    // execute a function
                    break;
                case 'View all roles':
                    // Execute a function
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
}