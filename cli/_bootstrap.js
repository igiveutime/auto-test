import { fileURLToPath } from 'url';
import { dirname } from 'path';
import FileManager from './service/file-manager.js';

const __currentFileName = fileURLToPath(import.meta.url);
const __currentDirName  = dirname(__currentFileName);
const __rootDirName     = dirname(__currentDirName);

export default function boot() {
    const fileManager = new FileManager();
    fileManager.initRootDir(__rootDirName);
}