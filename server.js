const inquirer = require('inquirer');
const db = require('./db/connection');

db.connect(err => {
    if (err) {
        throw err
    }
    promptUser();
});
//prompt user
const promptUser = () => {
    inquirer
        .prompt([{
            name: `action`,
            type: `list`,
            message: `What would you like to do?`,
            choices: [
                `View Employees`,
                `View Roles`,
                `View Departments`,
                `Add Employee`,
                `Add Role`,
                `Add Department`,
                `Update Employee's Role`,
                `Exit`
            ]
        }
        ])
        .then((response) => {
            switch (response.action) {
                case `View Employees`: viewEmployees(); break;
                case `View Roles`: viewRole(); break;
                case `View Departments`: viewDepartment(); break;
                case `Add Department`: addDepartment(); break;
                case `Add Role`: addRole(); break;
                case `Add Employee`: addEmployee(); break;
                case `Update Employee's Role`: updateEmployeeRole(); break;
                case `Exit`: db.end(); break;
            }
        })
};

//show tables of departments
const viewDepartment = () => {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res)
        promptUser();
    })
  };

//show tables of employee
function viewEmployees() {
    const sql = `SELECT employee.*, role.title
    AS job_title, role.salary AS salary
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res)
        promptUser()
    })
  };

  //chow role tables
  function viewRole() {
    const sql = `SELECT role.*, department.name
    AS department
    FROM role
    LEFT JOIN department
    ON role.department_id = department.id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res)
        promptUser()
    })
  };

  //create new department
  const addDepartment = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'department_name',
                message: 'What is the name of the department?'
            }
        ]).then(response => {
            db.query("INSERT INTO department SET ?", {
                name: response.department_name
            }, function () {
                promptUser()
            })
        });
  };

//update employee's role
const updateEmployeeRole = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'What is the id number of the employee?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the new role?',
                choices: ['Associates', 'Inventory Reps', 'Department Managers',  'Assistant Managers', 'Store Manager']
            }
        ]).then(response => {
            db.query("UPDATE employee SET role_id = ? WHERE id = ?",
                [turnRoletoID(response.role), response.employee_id]
                , function () {
                    promptUser()
                })
        });
  };

  //enter role
function turnRoletoID(role) {
    if (role == 'Associates') {
        return 3;
    }
    else if (role == 'Inventory Reps') {
        return 4;
    }
    else if (role == 'Department Managers') {
        return 5;
    }
    else if (role == 'Assistant Managers') {
        return 6;
    }
    else if (role == 'Store Manager') {
        return 7;
    }
  }

  function turnDepartmmentoID(role) {
    if (department == 'Associates') {
        return 1;
    }
    else if (department == 'Inventory Reps') {
        return 2;
    }
    else if (department == 'Department Managers') {
        return 3;
    }
    else if (department == 'Assistant Managers') {
        return 4;
    }
    else if (department == 'Store Manager') {
        return 5;
    }
  }
  function turnManagertoID(man) {
    if (man == 'John') {
        return 1;
    }
    else if (man == 'Kelly') {
        return 2;
    }
};

//create  new roll
const addRole = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'

            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department is the role?',
                choices: ['Curator', 'Educator', 'Docent', 'Lawyer']
            }
        ]).then(response => {
            db.query("INSERT INTO role SET ?", {
                title: response.title,
                salary: response.salary,
                department_id: turnDepartmmentoID(response.department)
            }, function () {
                promptUser()
            })
        });
};

//create new employee
const addEmployee = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is employee's last name?",
            },
            {
                type: 'list',
                name: 'role',
                message: "What is employee's role?",
                choices: ['Assistant Manager', 'Department Managers', 'Inventory Rep', 'Associates']
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: ['Dante', 'Tommy', 'Billy', 'George']
            }
        ]).then(response => {
            db.query("INSERT INTO employee SET ?", {
                first_name: response.first_name,
                last_name: response.last_name,
                role_id: turnRoletoID(response.role),
                manager_id: turnManagertoID(response.manager)
            }, function () {
                promptUser()
            })
        });
}