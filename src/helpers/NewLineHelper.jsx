const br2nl = (str) => {
    return str.replace(/<br\s*\/?>/mg, "\n");
}