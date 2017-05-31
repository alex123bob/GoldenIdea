export function selectMenuItem(itemId) {
    return {
        type: `SELECT_${itemId}`,
    };
}
