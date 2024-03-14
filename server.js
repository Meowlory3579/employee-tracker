// Packages required for this application
const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3003;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
);

// Function to prompt user
// function doTheNeedful() {
//     inquirer
//         .prompt({
//             type: 'list',
//             name: 'action',
//             message: 'Please make a selection',
//             choices: [
//                 'View all departments',
//                 'View all roles',
//                 'View all employees',
//                 'Add a department',
//                 'Add a role',
//                 'Add an employee',
//                 'Update an employee role'
//             ]
//         })
//         .then(answers => {
//             switch (answers.action) {
//                 case 'View all departments':
//                     // execute a function
//                     break;
//                 case 'View all roles':
//                     // Execute a function
//                     break;
//                 case 'View all employees':
//                     // Execute a function
//                     break;
//                 case 'Add a department':
//                     // Execute
//                     break;
//                 case 'Add a role':
//                     // Execute
//                     break;
//                 case 'Add an employee':
//                     // Execute
//                     break;
//                 case 'Update an employee role':
//                     // Execute
//                     break;    
//             }
//         })
// };

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});