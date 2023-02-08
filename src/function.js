
export async function getData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        
        const ret = await response.json();
        return ret;

    } catch (error) {
        console.log(error);
    }
};

export const priceSort = (data, type) => {
        const sorted = type === "asc" ? [...data].sort((a, b) => a.offer.displayPrice.amount - b.offer.displayPrice.amount)
                            :[...data].sort((a, b) => b.offer.displayPrice.amount - a.offer.displayPrice.amount);
        return sorted
};