```js
// main.js
let PromiseWorker = require( 'promise-worker' );
let WorkerFile = new Worker( 'worker.js' );

let Worker = new PromiseWorker( worker );

Worker.postMessage( 'Sample Message Data' )
    .then( ( response ) => {/* Do Something */ } )
    .catch( ( error ) => { /* Handle Error*/ } );
```