// Required Node Packages
const fs = require("fs");
const inquirer = require("inquirer");
const jest = require("jest");

// Required /lib script files
const Employee = require("./lib/employee.js")
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");
const Manager = require("./lib/manager.js");

// Holds all team members in an Array.
const employeeArr = [];

// This function will initialze the applicaion
function init() {
	createHTML();
}

// Creates the beginning document of the HTML.
function createHTML() {
	const html = `
	<!DOCTYPE html>
	<html lang="en">
	
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="./src/bootstrap-reboot.css" />
		<link rel="stylesheet" href="./src/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="./src/main.css" />
		<link rel="stylesheet" href="https://use.typekit.net/omc6uwd.css">
		<script type="text/javascript" src="./app.js"></script>
		<title>WulfSounds</title>
	</head>
	
	<body>
		<header>
			<h1 id="title-main">wulf&co.</h1>
			<h1 id="title-second">wulf&co.</h1>
			<!-- <h1 id="title-fourth">WulfSounds</h1> -->
		</header>
		<div class="container">
        <h2 id="subheader">meet the dev team</h2>
		</div>
		<main>
			<section>`
	fs.writeFile("./team.html", html, function (err) {
		if (err) {
			console.error(err);
		} 
	createTeam();
	});
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
				name: "email"
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
					let team; // email undefined here
					switch (role) {
						case "Manager":
							team = new Manager(name, id, email, profile);
							break;

						case "Engineer":
							team = new Engineer(name, id, email, profile);
							break;

						default:
							team = new Intern(name, id, email, profile);
							break;
					}
					employeeArr.push(team);
					hiredHTML(team)
					.then(function () {
						addMembers === "Yes" ? createTeam() : footer();
					})
				});
		});
}

// Creates HTML for employee cards and inputs the data.
function hiredHTML(hireTeam) {
	return new Promise(function (resolve, reject) {
		// gathers data from user input
		const name = hireTeam.getName();
		const role = hireTeam.getRole();
		const id = hireTeam.getId();
		const email = hireTeam.getEmail();
		// Input Manager data into HTML
		try {
			switch (role) {
				case "Manager":
					let office = hireTeam.getOffice();
					data = `
                    <div class="card mb-3 border" style="max-width: 18rem;">
                    <div class="card-header">
                        <h2>${name}</h2>
                        <h3>Manager</h3>
                    </div>
                    <div class="card-body text-secondary">
                        <div class="card" style="width: 15.5rem;">
                            <ul class="list-group list-group-flush">
                                <li id="idNum" class="list-group-item">ID Number: ${id}</li>
                                <li id="email" class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                                <li id="profile" class="list-group-item">Office: ${office}</li>
                            </ul>
                        </div>
                    </div>
                </div>`;
                    console.log("Manager Added")
					break;

				case "Engineer":
					let gitHub = hireTeam.getGitHub();
                    data = `
                    <div class="card mb-3 border" style="max-width: 18rem;">
                    <div class="card-header">
                        <h2>${name}</h2>
                        <h3>Engineer</h3>
                    </div>
                    <div class="card-body text-secondary">
                        <div class="card" style="width: 15.5rem;">
                            <ul class="list-group list-group-flush">
                                <li id="idNum" class="list-group-item">ID Number: ${id}</li>
                                <li id="email" class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                                <li id="profile" class="list-group-item">GitHub: ${gitHub}</li>
                            </ul>
                        </div>
                    </div>
                </div>`;
                    console.log("Engineer Added")
                    break;

				case "Intern":
					let school = hireTeam.getSchool();
                    data = `
                    <div class="card mb-3 border" style="max-width: 18rem;">
                    <div class="card-header">
                        <h2>${name}</h2>
                        <h3>Intern</h3>
                    </div>
                    <div class="card-body text-secondary">
                        <div class="card" style="width: 15.5rem;">
                            <ul class="list-group list-group-flush">
                                <li id="idNum" class="list-group-item">ID Number: ${id}</li>
                                <li id="email" class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                                <li id="profile" class="list-group-item">School: ${school}</li>
                            </ul>
                        </div>
                    </div>
                </div>`;
                    console.log("Intern Added")
                    break;
			}
		} catch { console.error(err) }
        fs.appendFile("./team.html", data, (err) => {
            (err) ? reject(err) : resolve();
        })
	});
}

// Completes the HTML with a footer and closing tags
function footer() {
    const footer = `
			</section>
		</main>
		<footer>
			<h5>2022 Dev Wulf for SMU Coding Bootcamp | Find this repo on <span><a href="github.com/wulfsounds">GitHub.</a></span></h5>
		</footer>
	</body>

	</html>`;
    fs.appendFile("./team.html", footer, (err) => {
        (err) ? reject(err) : console.log("Success!");
    });
}

init();