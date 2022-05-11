import chalk from 'chalk';
import readlineSync from "readline-sync";
import fs from 'fs';

import pkg from '../package.json' assert {type: "json"};
import { execSync } from "child_process";

const ver = readlineSync.question( `New Package Version: (Current: ${ pkg.version }) ` );
pkg.version = ver;

fs.writeFileSync( './package.json', JSON.stringify( pkg, null, 4 ) );
console.log( `Updated package.json to ${ pkg.version }` );

execSync( `rollup -c` );
console.log( chalk.green( `Rolled up Successfully!` ) );