const getFieldNames = (json) => {
    const fieldObject = {};

    json.forEach(section => {
        section.fields.forEach(fieldGroup => {
            fieldGroup.row.forEach(field => {
                // Use the field name as the key and set the initial value to an empty string
                fieldObject[field.name] = '';
            });
        });
    });

    return fieldObject;
};

export const handleCopyToClipboard = (item) => {
    navigator.clipboard
        .writeText(item)
        .then(() => {
            console.log("Copied successfully");
        })
        .catch((err) => console.error("Failed to copy link:", err));
};

export const applyDebounce = (fn, delay) => {
    let timer;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

const convertOptions = (options) => {
    return options?.map((option, index) => ({
        label: option,
        // value: option.toLowerCase().replace(/\s+/g, '_') // Converts to lowercase and replaces spaces with underscores
        value: option
    }));
};

export const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export {
    getFieldNames,
    convertOptions
}
