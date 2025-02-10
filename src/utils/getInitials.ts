export const getInitials = (fullName: string): string => {
    if (!fullName) return "";

    const nameParts = fullName.trim().split(" ");
    if (nameParts.length === 1) {
        return nameParts[0][0].toUpperCase(); // If only one name, return its first letter
    }

    const firstInitial = nameParts[0][0].toUpperCase();
    const lastInitial = nameParts[nameParts.length - 1][0].toUpperCase();

    return `${firstInitial}${lastInitial}`;
};