'use strict'

let messageIds = 0

function onMessage ( self, e ) {
    let message = e.data
    if ( !Array.isArray( message ) || message.length < 2 ) {
        // Ignore - this message is not for us.
        return;
    }
    let messageId = message[ 0 ];
    let error = message[ 1 ];
    let result = message[ 2 ];

    let callback = self._callbacks[ messageId ];

    if ( !callback ) {
        // Ignore - user might have created multiple PromiseWorkers.
        // This message is not for us.
        return;
    }

    delete self._callbacks[ messageId ];
    callback( error, result );
}

function PromiseWorker ( worker ) {
    let self = this;
    self._worker = worker;
    self._callbacks = {};

    worker.addEventListener( 'message', function ( e ) {
        onMessage( self, e );
    } );
};

PromiseWorker.prototype.postMessage = function ( userMessage ) {
    let self = this;
    let messageId = messageIds++;

    let messageToSend = [ messageId, userMessage ];

    return new Promise( function ( resolve, reject ) {
        self._callbacks[ messageId ] = function ( error, result ) {
            if ( error ) {
                return reject( new Error( error.message ) );
            };
            resolve( result );
        };

        /* istanbul ignore if */
        if ( typeof self._worker.controller !== 'undefined' ) {
            // service worker, use MessageChannels because e.source is broken in Chrome < 51:
            // https://bugs.chromium.org/p/chromium/issues/detail?id=543198
            let channel = new MessageChannel();
            channel.port1.onmessage = function ( e ) {
                onMessage( self, e );
            };
            self._worker.controller.postMessage( messageToSend, [ channel.port2 ] );
        } else {
            // web worker
            self._worker.postMessage( messageToSend );
        };
    } );
};

export default PromiseWorker;