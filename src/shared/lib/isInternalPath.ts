const MAX_CONTROL_CHAR_CODE = 0x1f;
const DELETE_CHAR_CODE = 0x7f;

function hasControlCharacter(value: string): boolean {
    for (let index = 0; index < value.length; index += 1) {
        const charCode = value.charCodeAt(index);

        if (charCode <= MAX_CONTROL_CHAR_CODE || charCode === DELETE_CHAR_CODE) {
            return true;
        }
    }

    return false;
}

export function isInternalPath(url: string): boolean {
    return url.startsWith('/') && !url.startsWith('//') && !url.startsWith('/\\') && !hasControlCharacter(url);
}
