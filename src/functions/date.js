const getDateStr = (date) => {
    const formatOptions = { month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', formatOptions);
};

export { getDateStr };