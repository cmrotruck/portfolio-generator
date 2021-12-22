const inquirer = require('inquirer');
const { stubFalse } = require('lodash');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? ',
            validate: nameInput => {
                if (nameInput){
                    return true;
                } else {
                    console.log('Please enter your name!')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username: ',
            validate: githubInput => {
                if (githubInput){
                    return true;
                } else {
                    console.log('Please enter your name!')
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: false
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself: ',
            when: ({confirmAbout}) => {
                if (confirmAbout){
                    return true;
                } else {
                    return false; 
                }
            }
        }
    ]);
};

const promptProject = portfolioData => {
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
========================
Add a new Project 
========================
`);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: nameInput => {
                if (nameInput){
                    return true;
                } else {
                    console.log(`Please enter your project's name!`)
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (required)',
            validate: descInput => {
                if (descInput){
                    return true;
                } else {
                    console.log(`Please enter your project's description!`)
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'Jquery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput){
                    return true;
                } else {
                    console.log(`Please enter your project's GitHub link!`)
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
});

// promptUser()
//     .then(answers => console.log(answers))
//     .then(promptProject)
//     .then(projectAnswers => console.log(projectAnswers))
//     .then(projectData => {
//         if (projectData.confirmAddProject) {
//             return promptProject(portfolioData);
//         } else {
//             return portfolioData;
//         }
//     });
// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });