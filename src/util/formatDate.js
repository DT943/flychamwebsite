const formatDate = (input) => {
    const date = input instanceof Date ? input : new Date(input);
    if (isNaN(date)) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}T00:00:00`;
};

export default formatDate;
