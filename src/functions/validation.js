const checkFulfilledPL = (p, l) => {
    return p?.first_name && p?.last_name && p?.phone && l > 0;
};

export { checkFulfilledPL };