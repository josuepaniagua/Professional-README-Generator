const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const fs = require('fs');

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Title of your project?',
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: 'GitHub Username?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email address?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter description of your project!',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Provide step-by-step instructions to install your project.',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide instructions and examples for use.',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Enter the license you will use for your project?',
        choices: ['None','Academic Free License v3.0','Apache license 2.0','Artistic license 2.0','Boost Software License 1.0','BSD 2-clause "Simplified" license','BSD 3-clause "New" or "Revised" license','BSD 3-clause Clear license','Creative Commons license family','Creative Commons Zero v1.0 Universal','Creative Commons Attribution 4.0','Creative Commons Attribution Share Alike 4.0','Educational Community License v2.0','Eclipse Public License 1.0','Eclipse Public License 2.0','European Union Public License 1.1','GNU Affero General Public License v3.0','GNU General Public License family','GNU General Public License v2.0','GNU General Public License v3.0','GNU Lesser General Public License family','GNU Lesser General Public License v2.1','GNU Lesser General Public License v3.0','ISC','LaTeX Project Public License v1.3c','Microsoft Public License','MIT','Mozilla Public License 2.0','Open Software License 3.0','PostgreSQL License','SIL Open Font License 1.1','University of Illinois/NCSA Open Source License','The Unlicense','zLib License']
    },
    {
        type: 'confirm',
        name: 'contributions',
        message: 'Did you have contributors?',
        default: true
    },
    {
        type: 'input',
        name: 'contributors',
        message: 'Please provide username and link of contributors',
        when: ({ contributions }) => {
            if (contributions) {
                return true;
            } else {
                return false;
            }
        },
    },
];

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./generated-README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File was created successfully!'
            });
        });
    });
};

const init = () => {

    return inquirer.prompt(questions)
    .then(userdata => {
        return userdata;
    })
}

init()
.then(userdata => {
    console.log(userdata);
    return generateMarkdown(userdata);
})
.then(pageMD => {
    return writeFile(pageMD);
})
.then(writeFileResponse => {
    console.log(writeFileResponse.message);
})
.catch(err => {
    console.log(err);
})