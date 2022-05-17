export const URLParams = {
    get ( url = window.location.search ) {
        const entries = new URLSearchParams( url ).entries();
        const params = {};
        for ( let entry of entries ) params[ entry[ 0 ] ] = entry[ 1 ];
        return params;
    },
    set ( key, value ) {
        let searchParams = new URLSearchParams( window.location.search );
        searchParams.set( key, value );
        let newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
        window.history.pushState( { path: newURL }, '', newURL );
    }
};

export const parseCookie = str => str
    .split( ';' )
    .map( v => v.split( '=' ) )
    .reduce( ( acc, v ) => {
        acc[ decodeURIComponent( v[ 0 ].trim() ) ] = decodeURIComponent( v[ 1 ].trim() );
        return acc;
    }, {} );

export const copyToClipboard = str => {
    const el = document.createElement( 'textarea' );
    el.value = str;
    el.setAttribute( 'readonly', '' );
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild( el );
    const selected =
        document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt( 0 )
            : false;
    el.select();
    document.execCommand( 'copy' );
    document.body.removeChild( el );
    if ( selected ) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange( selected );
    }
};