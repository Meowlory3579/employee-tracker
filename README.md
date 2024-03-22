# Employee Tracker

## Description
This is a command-line application that uses Node.js, Inquirer, and MySQL to accept user input and allow them to view and manage the departments, roles, and employees in the company.

## User Story
AS A business owner  
I WANT to be able to view and manage the departments, roles, and employees in my company  
SO THAT I can organize and plan my business  

## Acceptance Criteria
GIVEN a command-line application that accepts user input  
WHEN I start the application, THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role.  
WHEN I choose to view all departments, THEN I am presented with a formatted table showing department names and department ids.  
WHEN I choose to view all roles, THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role.    
WHEN I choose to view all employees, THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.  
WHEN I choose to add a department, THEN I am prompted to enter the name of the department and that department is added to the database.  
WHEN I choose to add a role, THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database.  
WHEN I choose to add an employee, THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database.  
WHEN I choose to update an employee role, THEN I am prompted to select an employee to update and their new role and this information is updated in the database.

## Installation for developers
Install Node.js, if needed.     

Create a .gitignore file and include "node_modules", ".vscode", and "package-lock.json" in it, so that these files aren't tracked or uploaded to GitHub. Be sure to create your .gitignore file before installing any npm dependencies.     

Make sure that your repo includes a package.json with the required dependencies. You can create one by running "npm init" when you first set up the project, before installing any dependencies.     

This application requires the Inquirer package. To install express, navigate to your terminal and enter "npm install inquirer@8.2.4".  

This application requires the MySQL2 package. To install express, navigate to your terminal and enter "npm install --save mysql2".

## Usage for developers
Right-click on the "index.js" file and select "Open in Integrated Terminal". To initiate application, type "node index.js" and press enter.

## The following video demonstrates the application's functionality
https://drive.google.com/file/d/15Qj8BF3i-vRWxXcF549H0kdHOfXg1cNm/view?usp=sharing

![Demonstration of application that allows users to view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role](https://drive.google.com/file/d/15Qj8BF3i-vRWxXcF549H0kdHOfXg1cNm/view?usp=sharing)