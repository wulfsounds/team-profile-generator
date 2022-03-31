// Required Node Packages
const fs = require("fs");
const inquirer = require("inquirer");
const jest = require("jest");
const create = require("createHTML")

// Required /lib script files
const Employee = require("./lib/employee.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");
const Manager = require("./lib/manager.js");

// Holds all team members in an Array.
const employeeArr = [];

// Executional functions go here
async function init() {
	createTeam();	
}


// This function executes a prompt to acquire information about added team members then assigns that information with the role selected
function createTeam() {
	console.log("Let's Build a Team!");
	inquirer
		.prompt([
			{
				type: "input",
				message: `What is the team member's name?`,
				name: "name",
			},
			{
				type: "list",
				message: "What type of role do they have?",
				choices: ["Manager", "Engineer", "Intern"],
				name: "role",
			},
			{
				type: "input",
				message: `What is their employee id number?`,
				name: "id",
			},
			{
				type: "input",
				message: `What is their email address?`,
				name: "email",
			},
		])
		.then(function ({ name, role, id, email }) {
			let profile = "";
			switch (role) {
				case "Manager":
					profile = "office number";
					break;

				case "Engineer":
					profile = "GitHub";
					break;

				default:
					profile = "school";
					break;
			}
			// Additional information is required to complete a profile based on the selected role.
			inquirer
				.prompt([
					{
						type: "input",
						message: `what is the ${role}'s ${profile}?`,
						name: "profile",
					},
					{
						type: "list",
						message: "Add additional members to you your team?",
						choices: ["Yes", "No"],
						name: "addMembers",
					},
				])
				// If additional team members are needed, then repeat function and push additional members to the employeeArr array
				.then(function ({ addMembers, profile }) {
					switch (role) {
						case "Manager":
							newMember = new Manager(name, id, email, profile);
							break;

						case "Engineer":
							newMember = new Engineer(name, id, email, profile);
							break;

						default:
							newMember = new Intern(name, id, email, profile);
							break;
					}
					employeeArr.push(newMember);
					addMembers === "Yes" ? createTeam() : createHtml(newMember);
				});
		});
}
