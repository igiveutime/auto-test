import boot from './_bootstrap.js';

import Locker, { lockFileName } from './service/locker.js';
import ColorLog from './service/color-log.js';

boot();

if (!Locker.hasLock()) {
    ColorLog.warning(`Лок-файл ${lockFileName} не найден`);
    process.exit();
}

try {
    Locker.unlock();
    ColorLog.info(`Лок-файл ${lockFileName} удален`);
} catch (e) {
    ColorLog.error(`Ошибка при удалении ${lockFileName} : ${e}`);
}


