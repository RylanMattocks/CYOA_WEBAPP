const PREFIX = 'cyoagame_'
let debounceTimeout;

export function setStorageItem(key, value) {
    const now = new Date();
    const expiration = 3600 * 1000;
    const item = {
        value: value,
        expire: now.getTime() + expiration,
        lastActivity: now.getTime()
    };
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(item));
}

export function getStorageItem(key) {
    const json = localStorage.getItem(`${PREFIX}${key}`);
    if (!json) return null;

    const item = JSON.parse(json);
    const now = new Date();

    if (now.getTime() > item.expire || now.getTime() - item.lastActivity > 3600 * 1000) {
        localStorage.removeItem(`${PREFIX}${key}`);
        return null;
    }

    return item.value;
}

export function isExpired(key) {
    const json = localStorage.getItem(`${PREFIX}${key}`);
    if (!json) return true;

    const item = JSON.parse(json);
    const currentTime = Date.now();
    if (item.expire < currentTime || currentTime - item.lastActivity > 3600 * 1000) {
        localStorage.removeItem(`${PREFIX}${key}`);
        return true;
    }

    return false;
}

export function updateActivity() {
    const now = new Date().getTime();
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
        if (key.startsWith(PREFIX)) {
            const json = localStorage.getItem(`${PREFIX}${key}`);
            if (json) {
                const item = JSON.parse(json);
                item.lastActivity = now;
                localStorage.setItem(key, JSON.stringify(item));
            }
        }
    });
}

export function trackActivity() {
    const events = ['keydown', 'scroll', 'click'];
    events.forEach(event => {
        window.addEventListener(event, updateActivity);
    });

    window.addEventListener('mousemove', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(updateActivity, 300000);
    })
}