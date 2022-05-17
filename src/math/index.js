export const uuid = () => ( [ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11 ).replace( /[018]/g, c =>
    ( c ^ crypto.getRandomValues( new Uint8Array( 1 ) )[ 0 ] & 15 >> c / 4 ).toString( 16 )
);

export const xor = ( a, b ) => {
    if ( typeof a === 'string' && typeof b === 'string' ) {
        let c = "";
        for ( i = 0;i < a.length;i++ ) {
            c += String.fromCharCode(
                a[ i ].charCodeAt( 0 ).toString() ^ b.charCodeAt( 0 ).toString()
            );
        }
        return c;
    }
};

export const hash = val => crypto.subtle.digest( 'SHA-256', new TextEncoder( 'utf-8' ).encode( val ) )
    .then( h => {
        let hexes = [],
            view = new DataView( h );
        for ( let i = 0;i < view.byteLength;i += 4 )
            hexes.push( ( '00000000' + view.getUint32( i ).toString( 16 ) ).slice( -8 ) );
        return hexes.join( '' );
    } );

export function range ( start, end, step = 1 ) {
    return {
        [ Symbol.iterator ] () {
            return this;
        },
        next () {
            if ( start < end ) {
                start += step;
                return { value: start, done: false };
            }
            return { done: true, value: end };
        }
    };
};
// USAGE
// for ( const n of range( 0, 20, 5 ) ) {
//     console.log( n ); // 5, 10, 15, 20
// };