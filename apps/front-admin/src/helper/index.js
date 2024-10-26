export const shortenWalletAddress = (str) => {
    const regex = /(.{5})\w+(.{5})/;
    return str.replace(regex, '$1...$2');
};

export function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDateStr(date_str) {
    const date = new Date(date_str);
    return ('0' + (date.getMonth() + 1)).substr(-2) + "." + ('0' + date.getDate()).substr(-2) + "." + date.getFullYear()
}

export function truncate(str, maxDecimalDigits) {
    if (str && str.includes('.')) {
        const parts = str.split('.');
        return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits);
    }
    return str;
}

export function formatContent(str) {
    
}