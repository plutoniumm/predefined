const fs = require( 'fs' );
const path = require( 'path' );
const { execSync } = require( 'child_process' );
const pkg = require( '../package.json' );
const readlineSync = require( 'readline-sync' );

const [ major, minor, patch ] = pkg.version.split( "." );

const ver = readlineSync.question( `New Package Version: (Current: ${ pkg.version }) ` );
pkg.version = ver;
fs.writeFileSync( '../package.json', JSON.stringify( pkg ) );
console.log( `Updated package.json to ${ pkg.version }` );

execSync( `rollup -c` );