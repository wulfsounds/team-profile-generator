// Files required to execute application
const fs = require("fs");
const jest = require("jest");
const app = require("./app.js");

// Script from /lib
// const employee = require("./employee");
// const manager = require("./manager");
// const engineer = require("./engineer");
// const intern = require("./intern");

// This function creates the HTML file.
function createHTML() {
	const html = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./bootstrap-reboot.css" />
        <link rel="stylesheet" href="./bootstrap.css" />
        <link rel="stylesheet" type="text/css" href="./main.css" />
        <script type="text/javascript" src="./app.js"></script>
        <title>Team Profile Generator</title>
    </head>

    <body>
        <header>
            <h1>My Team</h1>
        </header>`
	fs.writeFile("./team.html", html, function (err) {
		if (err) {
			console.error(err);
		}
	});
}

// Creates HTML for employee cards and inputs the data.
function hiredHTML(team) {
	return new Promise((resolve, reject) => {
		// gathers data from user input
		const name = team.getName();
		const role = team.getRole();
		const id = team.getId();
		const email = team.getEmail();
		// Input Manager data into HTML
		try {
			switch (role) {
				case "Manager":
					let office = team.getOffice();
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
					let gitHub = team.getGitHub();
                    data = `
                    <div class="card mb-3 border" style="max-width: 18rem;">
                    <div class="card-header">
                        <h2>${name}</h2>
                        <h3>Role</h3>
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
					let school = team.getSchool();
                    data = `
                    <div class="card mb-3 border" style="max-width: 18rem;">
                    <div class="card-header">
                        <h2>${name}</h2>
                        <h3>Role</h3>
                    </div>
                    <div class="card-body text-secondary">
                        <div class="card" style="width: 15.5rem;">
                            <ul class="list-group list-group-flush">
                                <li id="idNum" class="list-group-item">ID Number: ${id}</li>
                                <li id="email" class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                                <li id="profile" class="list-group-item">GitHub: ${school}</li>
                            </ul>
                        </div>
                    </div>
                </div>`;
                    console.log("Intern Added")
                    break;
			}
		} catch { console.error(err) }
        fs.appendFile("./team.html", html, (err) => {
            (err) ? reject(err) : resolve(role);
        })
	});
}

// Completes the HTML with a footer and closing tags
function footer() {
    const footer = `
            <footer>
                <h5>2022 Dev Wulf for SMU Coding Bootcamp | Find this repo on <span><a href="github.com/wulfsounds">GitHub.</a></span></h5>
            </footer>
        </body>
    </html>`;
    fs.appendFile("./team.html", footer, (err) => {
        (err) ? reject(err) : console.log("Success!");
    });
}

module.exports = createHTML;