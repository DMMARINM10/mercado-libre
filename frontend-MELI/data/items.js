const ITEM_CONDITION = {
    new: 'Nuevo',
    used: 'Usado',
}

export const itemCondition = (condition) => {
    return ITEM_CONDITION[condition] || '';
}