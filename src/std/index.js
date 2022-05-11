export const thread = fn => {
    const worker = new Worker(
        URL.createObjectURL(
            new Blob( [ `postMessage((${ fn })());` ] ),
            { type: 'application/javascript; charset=utf-8' }
        )
    );
    return new Promise( ( res, rej ) => {
        worker.onmessage = ( { data } ) => {
            res( data ), worker.terminate();
        };
        worker.onerror = err => {
            rej( err ), worker.terminate();
        };
    } );
};

export const delay = ( ms ) => new Promise( resolve => setTimeout( resolve, ms ) );

export const debounce = function ( func, wait, immediate ) {
    let timeout;
    return () => {
        let context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if ( !immediate ) func.apply( context, args );
        };
        let callNow = immediate && !timeout;
        clearTimeout( timeout );
        timeout = setTimeout( later, wait );
        if ( callNow ) func.apply( context, args );
    };
};


export default std = {
    thread,
    debounce,
    delay
};