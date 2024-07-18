export const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const decimalFormat = (number) => {
    const decimalString = number?.toString()
    const result = decimalString?.includes('.') 
        ? decimalString.substring(2, decimalString.length) 
        : '00'
    return result?.length !== 2 ? result + '0' : result
}