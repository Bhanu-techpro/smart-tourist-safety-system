// Example helper function
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
};

// Another example
export const truncateText = (text, length) => {
    if (text.length <= length) {
        return text;
    }
    return text.substring(0, length) + '...';
};
