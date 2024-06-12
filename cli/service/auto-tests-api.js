import MagentoApi from './magento-api.js';
import {formatDate, FULL_DATETIME_FILE_FORMAT, FULL_DATETIME_FORMAT} from "../utils/date-helper.js";
import FormData from "form-data";
import ReportManager from "./report-manager.js";
import FileManager from "./file-manager.js";
import ColorLog from "./color-log.js";

export default class AutoTestsApi {
    constructor() {
        this.magentoApi = new MagentoApi();
        this.reportManager = new ReportManager();
        this.fileManager = new FileManager();
    }

    async getPlans() {
        ColorLog.info('Берем тест-планы из magento...');
        return this.magentoApi.sendGet('auto_test/testPlan/getAll');
    }

    async saveReport(id) {
        const newFileName = formatDate(new Date(), FULL_DATETIME_FILE_FORMAT) + '.txt';
        const specificReportName = this.reportManager.getReportFile(newFileName);
        this.fileManager.copy(this.reportManager.getReportFile(), specificReportName)

        const formData = new FormData();
        formData.append('file', this.fileManager.createReadStream(specificReportName));
        formData.append('id', id);
        formData.append('date', formatDate(new Date(), FULL_DATETIME_FORMAT));

        return this.magentoApi.sendPost('auto_test/testResult/add', formData);
    }

}
