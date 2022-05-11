const func = ( () => {
    let argToElements = function ( src ) {
        if ( typeof src === 'string' ) {
            const tagName = /^<(\w+)>F/.exec( src )

            if ( tagName !== null )
                return [ document.createElement( tagName[ 1 ] ) ]
            else
                return [ ...document.querySelectorAll( src ) ]

        } else if ( src instanceof HTMLElement ) {
            return [ src ]
        } else if ( Array.isArray( src ) ) {
            const elems = []

            src.forEach( i => elems.push( ...argToElements( i ) ) )

            return elems;
        } else if ( 'isPredefined' in src )
            return src.sel();


        throw TypeError( `Expected string | HTMLElement | Array: got ${ typeof src }` );
    }

    const F = function ( ...src ) {
        let sel = argToElements( src )
        let iter = sel.forEach.bind( sel )

        return {
            on: function ( type, fn ) { iter( i => i.addEventListener( type, fn ) ); return this },
            off: function ( type, fn ) { iter( i => i.removeEventListener( type, fn ) ); return this },
            css: function ( s ) { iter( i => i.style.cssText += s ); return this },
            html: function ( h ) { iter( i => i.innerHTML = h ); return this },
            text: function ( t ) { iter( i => i.innerText = t ); return this },
            addClass: function ( t ) { iter( i => i.classList.add( t ) ); return this },
            toggleClass: function ( t ) { iter( i => i.classList.toggle( t ) ); return this },
            removeClass: function ( t ) { iter( i => i.classList.remove( t ) ); return this },
            empty: function () { iter( i => i.innerHTML = '' ); return this },
            attr: function ( k, v ) { iter( i => i.setAttribute( k, v ) ); return this },
            removeAttr: function ( k ) { iter( i => i.removeAttribute( k ) ); return this },
            parent: function () { iter( ( e, i ) => { sel[ i ] = e.parentNode } ); return this },
            remove: function () { iter( i => i.remove() ); return this },
            sel: () => sel,

            isPredefined: true
        }
    }

    F.fragment = () => F( document.createDocumentFragment() )

    return F;
} )

export default func();