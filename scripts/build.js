const fs = require( 'fs' );
const { execSync } = require( 'child_process' );
const pkg = require( '../package.json' );
const readlineSync = require( 'readline-sync' );

const ver = readlineSync.question( `New Package Version: (Current: ${ pkg.version }) ` );
pkg.version = ver;

fs.writeFileSync( './package.json', JSON.stringify( pkg, null, 4 ) );
console.log( `Updated package.json to ${ pkg.version }` );

execSync( `rollup -c` );