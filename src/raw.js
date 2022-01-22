const time = {
    since: function ( val ) {
        val = 0 | ( Date.now() - new Date( val ) ) / 1000;

        let //
            unit,
            length = {
                second: 60,
                minute: 60,
                hour: 24,
                day: 7,
                week: 4.35,
                month: 12,
                year: 10000
            },
            result;

        for ( unit in length ) {
            result = val % length[ unit ];
            if ( !( val = 0 | val / length[ unit ] ) )
                return result + ' ' + ( result - 1 ? unit + 's' : unit );
        };
    }
};

const thread = fn => {
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

const truthy = condition => condition ? true : false;