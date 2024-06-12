import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';

config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

    // кладем результат в html, но не открываем по умолчанию в той же консоли - просто заканчиваем скрипт
  reporter: [ ['html', { open: 'never' }] ],
  // reporter: 'list',
  use: {
    /* Макс время в миллисекундах на ожидание `click()` */
    actionTimeout: 4000,
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    ...(process.env.HTTP_AUTH === 'true'
        ? { httpCredentials: {
          username: process.env.HTTP_AUTH_USERNAME,
          password: process.env.HTTP_AUTH_PASSWORD,
        }}
        : {}
    ),
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Mobile Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
