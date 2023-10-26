export function Position(obj: HTMLElement, offset = 0) {
    var currenttop = 0 - offset;
    if (obj.offsetParent) {
        do {
            currenttop += obj.offsetTop;
            //@ts-ignore
        } while ((obj = obj.offsetParent));
        return [currenttop];
    }
}

//copy from old landing to be sure we're not breaking things
export function getParamByName(name: string, url = globalThis.window?.location?.href, startChar = '?') {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[${startChar}&]` + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
