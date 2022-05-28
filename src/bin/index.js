#!/usr/bin/env node
const { execSync } = require('child_process');

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
const dependencies = `cd ${projectName} && ${packageManagerName} install`;

console.log(`Creating new Express TypeScript GraphQL project: ${projectName}...`);

const checkedOut = runCommand(gitCheckout);
if (!checkedOut) process.exit(-1);

console.log('Installing dependencies...');

const installedDeps = runCommand(dependencies);
if (!installedDeps) process.exit(-1);

console.log('Project is ready! Follow the instructions in README.md to get started.');