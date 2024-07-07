const numberSeparation = (number) => {
    const integer = Math.floor(number);
    const decimals = Number((number - integer).toFixed(2));
    return {
        integer,
        decimals,
    }
}

const arrayCategories = (data) => {
    const availableFilters = data.available_filters.find((filter) => filter.id === 'category');
    if(availableFilters) {
        const categories = availableFilters?.values?.sort((a, b) => b.results - a.results).map((value) => value.name);
        return categories;
    }
    const filter = data?.filters?.find((filter) => filter?.id === 'category');
    const categories = filter?.values[0]?.path_from_root?.map((cat) => cat.name)
    return categories;
}

module.exports = {
    numberSeparation,
    arrayCategories,
}