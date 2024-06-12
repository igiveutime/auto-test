import FileManager from './file-manager.js';
import ReportManager from './report-manager.js';

const fileManager   = new FileManager();
const reportManager = new ReportManager();

export const lockFileName = reportManager.getReportFile('is_in_process.lock');

export default class Locker {
    static hasLock() {
        return fileManager.isExist(lockFileName);
    }

    static placeLock() {
        return fileManager.write(lockFileName, '1');
    }

    static unlock() {
        return fileManager.remove(lockFileName);
    }
}