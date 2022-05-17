import { onClickOutside } from './dom';
import { parseCookie, copyToClipboard, URLParams } from './storage';
import { uuid, xor, hash, range } from './math';
import { String2HTML, HTML2String } from './parser';
import { thread, debounce, delay } from './std';

import PromiseWorker from './functions/worker';
import F from './functions/bigF';

const FA = ( x ) => [ ...document.querySelectorAll( x ) ];

const dom = {
    onClickOutside
};

const storage = {
    parseCookie,
    copyToClipboard,
    URLParams
};

const math = {
    uuid,
    xor,
    hash,
    range
};

const parser = {
    String2HTML,
    HTML2String
};

const std = {
    thread,
    debounce,
    delay
};

module.exports = {
    PromiseWorker,
    // External
    dom,
    storage,
    math,
    parser,
    std,
    // Here
    F,
    FA
}