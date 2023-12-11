#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
  console.log("Please provide your app's name");
  console.log('For example :');
  console.log('    npx create-playwright-app my-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const soruceRepo = 'https://github.com/thangkieu/playwright-template.git';

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.error(`The file ${projectName} already exist in the current directory, please give it another name.`);
  } else {
    console.error(err);
  }

  process.exit(1);
}

async function main() {
  try {
    console.log('Downloading files...');
    execSync(`git clone --depth 1 ${soruceRepo} ${projectPath}`);

    process.chdir(projectPath);

    console.log('Installing dependencies...');
    execSync('npm install');

    console.log('Removing redundant files...');
    execSync('npx rimraf ./.git');
    try {
      fs.rmSync(path.join(projectPath, 'bin'), { recursive: true });
    } catch {}

    console.log('------------------------------------');
    console.log('Successful create new playwright app! Start running your tests by:\n');
    console.log(`  cd ${projectName}`);
    console.log('  npm test');
  } catch (error) {
    console.log(error);
  }
}

main();
