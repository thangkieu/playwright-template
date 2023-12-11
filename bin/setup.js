#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askUser(message, defaultValue) {
  return new Promise((resolve) => {
    readline.question(message, (value = defaultValue) => {
      resolve(value);
      readline.close();
    });
  });
}

async function verifyInput(projectName, projectPath) {
  if (!projectName) {
    console.log("Please provide your app's name");
    console.log('For example :');
    console.log('    npx create-playwright-app my-app');
    process.exit(1);
  }

  let npmTool = 'pnpm';
  try {
    execSync(`${npmTool} -v`);
  } catch (err) {
    const input = await askUser('pnpm is recommended. Do you want to continue with npm (y/N): ', 'N');
    if (input.toLowerCase() === 'y') {
      npmTool = 'npm';
    } else {
      process.exit(1);
    }
  }

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

  return npmTool;
}

function printSuccessMessage(projectName, npmTool) {
  const successfulMsg = 'Successful create new playwright app! Start running your tests by run these command:';
  const cdCmd = `cd ${projectName}`;
  const testCmd = `${npmTool} test`;
  const indent = 2;

  console.log(`+${'-'.repeat(successfulMsg.length + 2)}+`);
  console.log(`| ${successfulMsg} |`);
  console.log(`| ${' '.repeat(indent)}${cdCmd} ${' '.repeat(successfulMsg.length - cdCmd.length - indent)}|`);
  console.log(`| ${' '.repeat(indent)}${testCmd} ${' '.repeat(successfulMsg.length - testCmd.length - indent)}|`);
  console.log(`+${'-'.repeat(successfulMsg.length + 2)}+`);
}

async function main() {
  const projectName = process.argv[2];
  const currentPath = process.cwd();
  const projectPath = path.join(currentPath, projectName);
  const soruceRepo = 'https://github.com/thangkieu/playwright-template.git';
  const npmTool = await verifyInput(projectName, projectPath);

  try {
    console.log('Downloading files...');
    execSync(`git clone --depth 1 ${soruceRepo} ${projectPath}`);

    process.chdir(projectPath);

    // Below statements must be wrapped inside the 'async' function:
    const packageJsonStr = await fs.promises.readFile('package.json', 'utf8');

    const packageJSON = JSON.parse(packageJsonStr);

    packageJSON.name = projectName;
    packageJSON.description = '';
    packageJSON.version = '0.0.0';
    delete packageJSON.bin;

    const updatedPackageJsonStr = JSON.stringify(packageJSON, null, 2);
    await fs.promises.writeFile('package.json', updatedPackageJsonStr, 'utf8');

    console.log(`Installing dependencies using ${npmTool}...`);
    execSync(`${npmTool} install`);

    console.log('Removing redundant files...');
    execSync('npx rimraf ./.git');
    fs.rmSync(path.join(projectPath, 'bin'), { recursive: true });

    printSuccessMessage(projectName, npmTool);

    process.exit(0);
  } catch (error) {
    console.log(error);
  }
}

main();
