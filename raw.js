const ƒ = ( x ) => document.querySelector( x );
const FA = ( x ) => [ ...document.querySelectorAll( x ) ];

const time = {
    since: function ( val ) {
        val = 0 | ( Date.now() - new Date( val ) ) / 1000;
        let unit, length = {
            second: 60, minute: 60, hour: 24, day: 7, week: 4.35,
            month: 12, year: 10000
        }, result;

        for ( unit in length ) {
            result = val % length[ unit ];
            if ( !( val = 0 | val / length[ unit ] ) )
                return result + ' ' + ( result - 1 ? unit + 's' : unit );
        }
    }
}

function uuid () {
    return ( [ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11 ).replace( /[018]/g, c =>
        ( c ^ crypto.getRandomValues( new Uint8Array( 1 ) )[ 0 ] & 15 >> c / 4 ).toString( 16 )
    );
}

const xor_str = function ( a, b ) {
    let c = "";
    for ( i = 0;i < a.length;i++ ) {
        c += String.fromCharCode(
            a[ i ].charCodeAt( 0 ).toString() ^ b.charCodeAt( 0 ).toString()
        );
    }
    return c;
};

const hashBrowser = val => crypto.subtle
    .digest( 'SHA-256', new TextEncoder( 'utf-8' ).encode( val ) )
    .then( h => {
        let hexes = [],
            view = new DataView( h );
        for ( let i = 0;i < view.byteLength;i += 4 )
            hexes.push( ( '00000000' + view.getUint32( i ).toString( 16 ) ).slice( -8 ) );
        return hexes.join( '' );
    } );

const parseCookie = str => str
    .split( ';' )
    .map( v => v.split( '=' ) )
    .reduce( ( acc, v ) => {
        acc[ decodeURIComponent( v[ 0 ].trim() ) ] = decodeURIComponent( v[ 1 ].trim() );
        return acc;
    }, {} );

const copyToClipboard = str => {
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

const String2HTML = str => str.replace(
    /[&<>'"]/g,
    tag =>
    ( {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[ tag ] || tag )
);

const HTML2String = str => str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    tag =>
    ( {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"'
    }[ tag ] || tag )
);

const getµ = () => {
    const entries = new URLSearchParams( window.location.search ).entries();
    const params = {};
    for ( let entry of entries ) params[ entry[ 0 ] ] = entry[ 1 ];
    return params;
};

const setµ = ( key, value ) => {
    let searchParams = new URLSearchParams( window.location.search );
    searchParams.set( key, value );
    let newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    window.history.pushState( { path: newURL }, '', newURL );
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

const onClickOutside = ( element, callback ) => {
    document.addEventListener( 'click', e => {
        if ( !element.contains( e.target ) ) callback();
    } );
};

const truthy = condition => condition ? true : false;