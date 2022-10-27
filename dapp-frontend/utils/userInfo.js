// 48 ~ 57, 0 ~ 9
export const pwValidate = (pw) => {
    if (!pw) {
        return true;
    }
    for (let i = 0; i < pw.length; i++) {
        let code = pw.charCodeAt(i);
        if (48 > code || 58 < code) {
            return true;
        }
    }
    return false;
};
