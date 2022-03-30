// Required Node Packages
const fs = require("fs");
const inquirer = require("inquirer");
const jest = require("jest");

// Required /lib script files
const Employee = require("./lib/employee.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");
const Manager = require("./lib/manager.js");

// Holds all team members in an Array.
const employeeArr = [];

// Executional functions go here
createTeam();

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
		])
		.then(function ({ name, role, id }) {
			let profile = "";
			switch (role) {
				case "Manager":
					// this.role = role;
					profile = "office number";
					break;

				case "Engineer":
					// this.role = role;
					profile = "GitHub";
					break;

				default:
					// this.role = role;
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
					addMembers === "Yes" ? createTeam() : createHtml();
					switch (role) {
						case "Manager":
							newMember = new Manager(name, role, id, profile);
							break;

						case "Engineer":
							newMember = new Engineer(name, role, id, profile);
							break;

						default:
							newMember = new Intern(name, role, id, profile);
							break;
					}
					employeeArr.push(newMember);
				});
		});
}