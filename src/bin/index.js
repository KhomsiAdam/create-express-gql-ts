#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packageManagersArgs = ['--yarn', '--npm', '--pnpm'];

const validatePackageManagerArg = (packageManagerArg) => {
  if (!packageManagersArgs.includes(packageManagerArg)) {
    console.error(`Invalid package manager argument: ${packageManagerArg}`);
    console.log('Package managers arguments supported: --yarn, --npm, --pnpm');
    process.exit(-1);
  }
  return packageManagerArg.replace('--', '');
}

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
};

const projectName = process.argv[2] || 'express-gql-ts';
const packageManagerName = process.argv[3] ? validatePackageManagerArg(process.argv[3]) : 'yarn';

const gitCheckout = `git clone --depth 1 https://github.com/KhomsiAdam/create-express-gql-ts ${projectName}`;
const installDeps = `cd ${projectName} && ${packageManagerName} install`;

const githubWorkflowsPath = `${__dirname}/${projectName}/.github/workflows`;
const githubWorkYmlPath = `${__dirname}/${projectName}/.github/yml`;
const huskyPreCommitPath = `${__dirname}/${projectName}/.husky/pre-commit`;
const yarnLockPath = `${__dirname}/${projectName}/yarn.lock`;

console.log(`Creating new Express TypeScript GraphQL project: ${projectName}...`);
const checkedOut = runCommand(gitCheckout);
if (!checkedOut) process.exit(-1);

if (packageManagerName !== 'yarn') {
  console.log(`Setup project for: ${packageManagerName}...`);
  const packageManagerRunCommand = packageManagerName === 'npm' ? 'npm run' : packageManagerName
  // Replace yarn commands with the selected package manager's commands
  fs.readFile(huskyPreCommitPath, 'utf8', (readError, data) => {
    if (readError) return console.log(readError);
    const result = data
      .replaceAll('yarn', `${packageManagerRunCommand}`)
    fs.writeFile(huskyPreCommitPath, result, 'utf8', (writeError) => {
      if (writeError) return console.log(writeError);
    });
  });
  // Remove github workflow yarn.yml file and copy the selected package manager's yml file
  fs.unlinkSync(`${githubWorkflowsPath}/yarn.yml`);
  fs.copyFileSync(`${githubWorkYmlPath}/${packageManagerName}.yml`, `${githubWorkflowsPath}/${packageManagerName}.yml`);
}

console.log('Installing dependencies...');
const installedDeps = runCommand(installDeps);
if (!installedDeps) process.exit(-1);

// Remove yarn.lock file if package manager is not yarn
if (packageManagerName !== 'yarn') {
  fs.unlink(yarnLockPath, (err) => {
    if (err) throw err;
  });
}

console.log('Project is ready! Follow the instructions in README.md to get started.');