#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
const BinWrapper = require('bin-wrapper');

const version = '0.25.0'
const base = 'https://github.com/saucelabs/saucectl/releases/download';
const bin = new BinWrapper()
	.src(`${base}/v${version}/saucectl_${version}_mac_32-bit.tar.gz`, 'darwin', 'x86')
	.src(`${base}/v${version}/saucectl_${version}_mac_64-bit.tar.gz`, 'darwin', 'x64')
	.src(`${base}/v${version}/saucectl_${version}_linux_32-bit.tar.gz`, 'linux', 'x86')
	.src(`${base}/v${version}/saucectl_${version}_linux_64-bit.tar.gz`, 'linux', 'x64')
	.src(`${base}/v${version}/saucectl_${version}_win_32-bit.zip`, 'win32', 'x86')
	.src(`${base}/v${version}/saucectl_${version}_win_32-bit.zip`, 'win32', 'x64')
	.src(`${base}/v${version}/saucectl_${version}_win_64-bit.zip`, 'win64', 'x64')
    .dest(path.join(__dirname, 'bin'))
    .use(process.platform.startsWith('win') ? 'saucectl.exe' : 'saucectl')
	.version(`v${version}`);

/* istanbul ignore next */
async function main (b, args) {
	await b.run(['--version']);
	const saucectlProcess = spawn(b.path(), args, {
		stdio: [process.stdin, process.stdout, process.stderr]
	});
    saucectlProcess.on('exit', function (code) {
        /* eslint-disable */
        process.exit(code);
        /* eslint-enable */
    });
}

/* istanbul ignore if */
if (require.main === module) {
	main(bin, process.argv.slice(2));
}

module.exports = main;
