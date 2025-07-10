export function formatCurrency(value: number){
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(value);
}

export function toBoolean(srt: string){
    return srt.toLowerCase() === "true";
}