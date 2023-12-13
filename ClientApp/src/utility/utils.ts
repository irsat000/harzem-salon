export const convertToAscii = (inputString: string) => {
    return inputString
        .normalize("NFD") // Normalize to decomposed form
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .replace(/[^a-zA-Z0-9]/g, "_") // Replace non-alphanumeric characters with underscores
        .toLowerCase(); // Convert to lowercase (optional)
}

// "https://localhost:7173" | ""
export const apiLink = process.env.NODE_ENV === 'production' ? '' : 'https://localhost:7173';