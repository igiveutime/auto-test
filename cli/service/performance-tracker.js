export default class PerformanceTracker {
    static startTime = {};

    static start(key) {
        PerformanceTracker.startTime[key] = Date.now();
    }

    static end(key = '') {
        const finalTime = PerformanceTracker.getFinalTime(key);
        const prefixMsg = key ? (`[${key}] `) : '';

        const finalTimeMsg = Math.ceil(finalTime / 1000) + ' sec' + ' ' + (finalTime % 1000) + ' ms';

        console.log(`${prefixMsg} final time : ${finalTimeMsg}`);
    }

    static getFinalTime(key) {
        return Date.now() - PerformanceTracker.startTime[key];
    }
}
