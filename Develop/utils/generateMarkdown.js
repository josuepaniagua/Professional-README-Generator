function renderContributions(contributions, data) {
  if (!contributions) {
    return `
  No contributions
    `;
  } else {
    return `
  ${data}
    `;
  }
}

function renderLicenseBadge(license) { 
  if (license !== 'None') {
    return `
  ![badge](https://img.shields.io/badge/license-${license.split(" ").join("")}-blue)
    `;
  } else {
    return ' ';
  }
}

function generateMarkdown(data) {
  return `
  # ${data.title}
  
  ${renderLicenseBadge(data.license)}
  ## Table-of-Contents
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Questions](#questions)
  
  ## [Description](#table-of-contents)
  ${data.description}
  ## [Installation](#table-of-contents)
  ${data.installation}
  ## [Usage](#table-of-contents)
  ${data.usage}
  
  ## [License](#table-of-contents)
  ${data.license}

  ## [Contributing](#table-of-contents)
  
  ${renderContributions(data.contributions, data.contributors)}

  ## [Questions](#table-of-contents)
  If any questions, please use the links below:

  [GitHub](https://github.com/${data.githubUsername})

  [Email: ${data.email}](mailto:${data.email})
`;
}

module.exports = generateMarkdown;