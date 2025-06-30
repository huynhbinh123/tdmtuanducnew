export const formatCurrency = (number: string | number | bigint): string => {
    const value = Number(number);
    if (isNaN(value)) return '0 ₫';

    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    }).format(value);
};
export const scrollToSection = (value: string) => {
    const el = document.getElementById(value)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
    }
}
export const convertToSlug = (str: string) => {
    str = str.toLowerCase();

    // xóa dấu
    str = str
        .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
        .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

    // Thay ký tự đĐ
    str = str.replace(/[đĐ]/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // Xóa ký tự - liên tiếp
    str = str.replace(/-+/g, '-');

    // xóa phần dư - ở đầu & cuối
    str = str.replace(/^-+|-+$/g, '');

    // return
    return str;       // Replace multiple - with single -
}
export const formatDate = (dateString: string, withTime = true): string => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return 'Không rõ';

    const options: Intl.DateTimeFormatOptions = withTime
        ? {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }
        : {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };

    return new Intl.DateTimeFormat('vi-VN', options).format(date);
};


export const useNations = async () => {
    // Nếu đã có cache → trả về luôn
    const cached = localStorage.getItem('nations')
    if (cached) {
        return JSON.parse(cached)
    }

    // Nếu chưa có, load từ file JSON
    const files = import.meta.glob('../assets/json/nations.json', { eager: true })
    const raw = Object.values(files).map((module: any) => module.default)

    const nations = (Array.isArray(raw[0]) ? raw[0] : raw).map((nation: any) => ({
        ...nation,
        icon: `flag:${nation.code.toLowerCase()}-1x1`,
        label: `${nation.name} (${nation.dial_code})`,
        value: nation.dial_code
    }))

    // Lưu cache
    localStorage.setItem('nations', JSON.stringify(nations))

    return nations
}
