export function initiate(data, screen, size) {
    if (data != true) {
        data = [];
        for (let x = 0; x < screen.width; x += size) {
            data.push([]);
            for (let y = 0; y < screen.height; y += size) data[data.length - 1].push(0)
        }
    }
    return data;
}