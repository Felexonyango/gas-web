export const formatNumber = number => {
    return new Intl.NumberFormat('Ksh', { style: 'currency', currency: 'KSH' }).format(number);
}



