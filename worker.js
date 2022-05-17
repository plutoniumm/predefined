self.addEventListener( 'message', handleMessage );

const fetche = async ( modifier, argument, options ) => {
    const response = await fetch( argument, options );

    if ( modifier === 'json' )
        return await response.json();
    else
        return await response.text();
};

async function handleMessage ( e ) {
    const { event, argument, options } = e.data;
    const { type, modifier } = event;

    let data;
    if ( type === 'fetch' ) {
        data = await fetche( modifier = 'json', argument, options = { method: 'GET' } );
    }

    self.postMessage( { data, received: Date.now() } );
};

Worker.postMessage( {
    event: { type: 'fetch', modifier: 'json' },
    argument: 'https://jsonplaceholder.typicode.com/posts/1',
    options: { method: 'GET' }
} );