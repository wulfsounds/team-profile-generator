const fs = require("fs");
const inquirer = require("inquirer");
const jest = require("jest");
// const { addListener } = require("process");

const Employee = require("./lib/employee.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");
const Manager = require("./lib/manager.js");

const employees = [];

function addMember() {
	inquirer
		.prompt([
			{
				statement: "Let's build a team!",
				question: `What is the team member's name?`,
				name: "name",
			},
			{
				type: "input",
				question: "What type of role do they have?",
				name: "role",
				choices: ["Manager", "Engineer", "Intern"],
			},
			{
				type: "input",
				question: `What is their employee id number?`,
				name: "id",
			},
		])
		.then(function (name, role, id) {
			if (role === "Manager") {
				addManager();
			} else if (role === "Engineer") {
				addEngineer();
			} else {
				addIntern();
			}
		});
}



function addManager() {
	inquirer.prompt([
		{
			type: "input",
			question: `What is the manager's email?`,
			name: "email",
		},
		{
			type: "input",
			question: `What is the manager's office number?`,
			name: "office",
		}
	])
    .then(function (email, office) {

    })
}

function addEngineer() {
	inquirer.prompt([
		{
			type: "input",
			question: `What is the Engineer's email?`,
			name: "email",
		},
		{
			type: "input",
			question: `What is the Engineer's GitHub?`,
			name: "github",
		},
	]);
}

function addIntern() {
	inquirer.prompt([
		{
			type: "input",
			question: `What is the interns's email?`,
			name: "email",
		},
		{
			type: "input",
			question: `What school does the intern attend?`,
			name: "school",
		},
	]);
}
