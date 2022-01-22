export const get_url_params = () => {
    const entries = new URLSearchParams( window.location.search ).entries();
    const params = {};
    for ( let entry of entries ) params[ entry[ 0 ] ] = entry[ 1 ];
    return params;
};

export const set_url_params = ( key, value ) => {
    let searchParams = new URLSearchParams( window.location.search );
    searchParams.set( key, value );
    let newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    window.history.pushState( { path: newURL }, '', newURL );
};

export const onClickOutside = ( element, callback ) => {
    document.addEventListener( 'click', e => {
        if ( !element.contains( e.target ) ) callback();
    } );
};