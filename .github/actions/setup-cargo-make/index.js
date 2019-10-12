const core = require('@actions/core');
const github = require('@actions/github');
const io = require('@actions/io');
const tc = require('@actions/tool-cache');
const homedir = require('os').homedir();

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  const cargoMakeVersion = core.getInput('version');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  const tc = require('@actions/tool-cache');
  console.log(`Platform ${process.platform}!`);
  const execFolder = homedir + '/.cargo/bin';
  await io.mkdirP(execFolder);
  if (process.platform === 'win32') {
    const cargoMakePath = tc.downloadTool(`https://github.com/sagiegurari/cargo-make/releases/download/${cargoMakeVersion}/cargo-make-v${cargoMakeVersion}-x86_64-pc-windows-msvc.zip`);
    const extractedFolder = await tc.extractZip(cargoMakePath, execFolder);
    // const node12Path = tc.downloadTool('https://nodejs.org/dist/v12.7.0/node-v12.7.0-win-x64.7z');
    // const node12ExtractedFolder = await tc.extract7z(node12Path, 'path/to/extract/to');
  } else if (process.platform === 'darwin') {
    const cargoMakePath = tc.downloadTool(`https://github.com/sagiegurari/cargo-make/releases/download/${cargoMakeVersion}/cargo-make-v${cargoMakeVersion}-x86_64-apple-darwin.zip`);
    const extractedFolder = await tc.extractZip(cargoMakePath, execFolder);
  } else if (process.platform === 'linux') {
    const cargoMakePath = tc.downloadTool(`https://github.com/sagiegurari/cargo-make/releases/download/${cargoMakeVersion}/cargo-make-v${cargoMakeVersion}-x86_64-unknown-linux-musl.zip`);
    const extractedFolder = await tc.extractZip(cargoMakePath, execFolder);
  } else {
    core.setFailed('unsupported platform:' + process.platform);
  }
} catch (error) {
  core.setFailed(error.message);
}
