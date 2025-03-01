// distance.ts

/**
 * 使用 Haversine 公式计算两点之间的距离（单位：公里）
 * @param {number} lat1 - 第一点的纬度
 * @param {number} lon1 - 第一点的经度
 * @param {number} lat2 - 第二点的纬度
 * @param {number} lon2 - 第二点的经度
 * @returns {number} - 两点之间的距离（公里）
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // 检查坐标有效性
    if (!isValidCoordinate(lat1, lon1) || !isValidCoordinate(lat2, lon2)) {
        console.error('Invalid coordinates:', { lat1, lon1, lat2, lon2 });
        return Infinity;
    }

    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const R = 6371; // 地球半径，单位：公里
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);

    // Haversine 公式
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}

/**
 * 检查坐标是否有效
 * @param {number} lat - 纬度
 * @param {number} lon - 经度
 * @returns {boolean} - 坐标是否有效
 */
function isValidCoordinate(lat: number, lon: number): boolean {
    return (
        typeof lat === 'number' &&
        typeof lon === 'number' &&
        !isNaN(lat) &&
        !isNaN(lon) &&
        lat >= -90 &&
        lat <= 90 &&
        lon >= -180 &&
        lon <= 180
    );
}
