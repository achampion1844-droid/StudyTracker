

export function formatDay(date:Date):string {
        return date.toLocaleDateString('en-US', {
        day: 'numeric'
        });
    }

export function formatMonth(date:Date):string {
    return date.toLocaleDateString('en-US', {
    month: 'short'
    });
}

export function formatNumMonth(date:Date):string {
    return date.toLocaleDateString('en-US', {
    month: 'numeric'
    });
}

export function formatYear(date:Date):string {
    return date.toLocaleDateString('en-US', {
    year: 'numeric'
    });
}