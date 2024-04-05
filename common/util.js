export function intoMillisecond(str = "5m") {
    return str.match(/(\d+)([a-zA-Z]+)/g).reduce((prev, curr) => {
        let time = +curr.slice(0, str.length - 1)
        const type = curr.at(-1)
        if (type === "h") time = time * 60 * 60 * 1000
        if (type === "m") time = time * 60 * 1000
        if (type === "s") time = time * 1000
        return prev + time
    }, 0);
}


export function createServerObjectError(codeName = 'Server error', path = "path on the server.🤣🤣", message = "Server error please try again later.", statusCode = 500) {
    return {
        codeName,
        path,
        message,
        statusCode
    }
}


export function UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


export const sanitizeMongo = function (o = {}) {
    if (o instanceof Object) {
        for (const k in o) {
            if (/^\$/.test(k)) delete o[k]
            else sanitizeMongo(o[k])
        }
    }
    return o
}