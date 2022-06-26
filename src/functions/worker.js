'use strict'

// DOES NOT SUPPORT CHROME <51, it didn't have postMessage;
let messageIds = 0

function onMessage ( self, e ) {
    let message = e.data
    if ( !Array.isArray( message ) || message.length < 2 )
        return; // Ignore - this message is not for us.

    let [ messageId, error, result ] = message;

    let callback = self._callbacks[ messageId ];

    if ( !callback )
        return; // Ignore - user might have created multiple PromiseWorkers.

    delete self._callbacks[ messageId ];
    callback( error, result );
}

function PromiseWorker ( worker ) {
    let self = this;
    self._worker = worker;
    self._callbacks = {};

    worker.addEventListener( 'message', ( e ) => onMessage( self, e ) );
};

PromiseWorker.prototype.postMessage = function ( userMessage ) {
    let self = this;
    let messageId = messageIds++;

    let messageToSend = [ messageId, userMessage ];

    return new Promise( function ( resolve, reject ) {
        self._callbacks[ messageId ] = function ( error, result ) {
            if ( error )
                return reject( new Error( error.message ) );

            resolve( result );
        };

        self._worker.postMessage( messageToSend ); // web worker
    } );
};

export default PromiseWorker;