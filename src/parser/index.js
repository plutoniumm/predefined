export const String2HTML = str => str.replace(
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

export const HTML2String = str => str.replace(
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