import fs from 'fs';

const oldData = fs.readFileSync('old_data.js', 'utf8');
const currData = fs.readFileSync('src/data.js', 'utf8');

const course1StartOld = oldData.indexOf('id: 1,');
const course2StartOld = oldData.indexOf('id: 2,');
const course1Old = oldData.substring(course1StartOld, course2StartOld);

const course1StartCurr = currData.indexOf('id: 1,');
const course2StartCurr = currData.indexOf('id: 2,');

const patchedData = currData.substring(0, course1StartCurr) + course1Old + currData.substring(course2StartCurr);
fs.writeFileSync('src/data.js', patchedData);
console.log("Reverted Course 1 successfully. Preserved Course 4.");
