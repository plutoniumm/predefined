import { hash, xor, uuid } from "./singles/crypto";
import { String2HTML, HTML2String } from "./types/index";
import { copyToClipboard, parseCookie } from "./data/index";
import { get_url_params, set_url_params, onClickOutside } from "./web/index";

const F = ( x ) => document.querySelector( x );
const FA = ( x ) => [ ...document.querySelectorAll( x ) ];

module.exports = {
    // Here
    F,
    FA,
    // Crypto
    hash,
    xor,
    uuid,
    // Types
    String2HTML,
    HTML2String,
    // Data
    copyToClipboard,
    parseCookie,
    // Web
    url_params: {
        get: get_url_params,
        set: set_url_params
    },
    onClickOutside
}