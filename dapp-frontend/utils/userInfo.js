// 48 ~ 57, 0 ~ 9
export const TableName = "User" + "11";
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
export const afterMinute = (m) => {
    var tDate = new Date(Date.now());
    tDate.setMinutes(tDate.getMinutes() + m);
    return tDate.toISOString();
};
