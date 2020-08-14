'use strict';

const exec = require('child_process').exec;
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const config = require('../template.json');
const tplArr = Object.keys(config.tpl);

module.exports = () => {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'tplName',
				message: 'which tplName?',
				choices: tplArr
			},
			{
				type: 'input',
				name: 'projectName',
				message: 'projectName?',
				default: 'myApp'
			}
		])
		.then((answers) => {
			const tpl = config['tpl'];
			const { tplName, projectName } = answers;
			const gitUrl = tpl[tplName]['url'];
			const branch = tpl[tplName]['branch'];
			let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`;
			const spinner = ora(chalk.white('Start generating...')).start();

			exec(cmdStr, (error, stdout, stderr) => {
				spinner.stop();
				if (error) {
					spinner.fail('something error' + error);
					process.exit();
				}
				console.log(chalk.green('\n √ Generation completed!'));
				console.log(`\n cd ${projectName} && npm install \n`);
				process.exit();
			});
		});
};
