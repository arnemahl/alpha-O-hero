export function toWS(id, payload) {
    return JSON.stringify({ id, payload });
}

export function handleErrorWS(error) {
    error && console.error(error);
}
