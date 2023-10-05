export function Position(obj: HTMLElement, offset = 0) {
    var currenttop = -105 + offset;
    if (obj.offsetParent) {
        do {
            currenttop += obj.offsetTop;
            //@ts-ignore
        } while ((obj = obj.offsetParent));
        return [currenttop];
    }
}
