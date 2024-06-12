import 'dotenv/config';
import boot from './_bootstrap.js';

import Shell from './service/shell.js';
import ColorLog from './service/color-log.js';
import CliHandler from './service/cli-handler.js';
import Locker from './service/locker.js';
import AutoTestsApi from "./service/auto-tests-api.js";
import Log from "./service/log.js";

const autoTestsApi = new AutoTestsApi();
const cliHandler = new CliHandler(process.argv);

const lockFileName = 'reports/is_in_process.lock';
const hasLock = Locker.hasLock();

boot();

if (hasLock) {
    ColorLog.error(
        `Есть лок-файл: ${lockFileName}. Значит, тест уже запущен, подождите.\n`
        + `Или воспользуйтесь командой npm run unlock, если знаете, что тест точно не запущен (файл мог остаться после некорректной остановки теста).`
    );
    process.exit();
}

Locker.placeLock();
ColorLog.info(`Лок-файл создан: ${lockFileName}`);

Log.separator();

const testType = cliHandler.parseParam('test');
if (testType) {
    ColorLog.infoSecondary(testType);
}

let testsToRun = [];
if (!testType) {
    let magentoPlans = await autoTestsApi.getPlans();

    magentoPlans = magentoPlans ? magentoPlans.plans : [];
    magentoPlans.forEach(planData => {
        const testData = {};
        if (planData.type === 'main') {
            testData.test = 'addToCart';
        } else if (planData.title.toLowerCase() === 'pdp') {
            testData.test = 'visitPdp';
        }

        if (planData.id) {
            testData.magento_plan_id = planData.id;
        }

        const settings = planData.settings || {};
        const steps = settings.steps || [];
        const categoryStep = steps.find(step => step.type === 'category');
        if (categoryStep && categoryStep.slug) {
            testData.specific_category = categoryStep.slug;
        }
        const productStep = steps.find(step => step.type === 'pdp');
        if (productStep && productStep.slug) {
            testData.specific_product = productStep.slug;
        }

        if (testData.test) {
            testsToRun.push(testData);
        }
    });
} else {
    const planId = cliHandler.parseParam('planId');
    testsToRun.push({test: testType, magento_plan_id: planId});
}

console.log('Тесты под запуск:', testsToRun);

Log.separator();

for (const testToRun of testsToRun) {
    let command = `npx playwright test tests/${testToRun.test}.spec.ts`;
    if (testToRun.specific_category) {
        command = `SPECIFIC_CATEGORY_NAME="${testToRun.specific_category}" ${command}`;
    }
    if (testToRun.specific_product) {
        command = `SPECIFIC_PDP_URL="${testToRun.specific_product}" ${command}`;
    }

    ColorLog.warning(command);
    Shell.execWithOutput(command, false);

    try {
        if (testToRun.magento_plan_id) {
            console.log(`Сохраняем репорт в мадженту для ${testToRun.test}`);
            await autoTestsApi.saveReport(testToRun.magento_plan_id);
        }
    } catch(e) {
        ColorLog.error(`Ошибка отправки файла репорта для ${testToRun.test}.`);
    }
}

Log.separator();

if (Locker.hasLock()) {
    Locker.unlock();
}

ColorLog.info(`Лок-файл удален: ${lockFileName}`);

