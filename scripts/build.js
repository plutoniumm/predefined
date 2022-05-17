const fs = require( 'fs' );
const readlineSync = require( 'readline-sync' );
const { execSync } = require( 'child_process' );

const pkg = require( '../package.json' );
const chalk = require( "chalk" );

const ver = readlineSync.question( `New Package Version: (Current: ${ pkg.version }) ` );
pkg.version = ver;

fs.writeFileSync( './package.json', JSON.stringify( pkg, null, 4 ) );
console.log( `Updated package.json to ${ pkg.version }` );

execSync( `rollup -c` );
console.log( chalk.blue( `Rolled up Successfully!` ) );