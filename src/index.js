import dom from './dom';
import storage from './storage';
import math from './math';
import parser from './parser';
import std from './std';

import PromiseWorker from './functions/worker';
import F from './functions/bigF';

const FA = ( x ) => [ ...document.querySelectorAll( x ) ];

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