import nextEnv from '@next/env';
import path from 'node:path';
import { accessSync, constants } from 'node:fs';

nextEnv.loadEnvConfig(process.cwd(), false);
const errors = [];
const secret = process.env.AUTH_SECRET || '';
const password = process.env.ADMIN_PASSWORD || '';
if (secret.length < 32 || secret === 'ammayu-local-dev-secret-change-me') errors.push('AUTH_SECRET must be a random secret of at least 32 characters.');
if (password.length < 16 || password === 'admin123') errors.push('ADMIN_PASSWORD must be a unique password of at least 16 characters.');
const mysqlKeys = ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_DATABASE'];
const mysqlSet = mysqlKeys.filter(key => process.env[key]);
if (mysqlSet.length && mysqlSet.length !== mysqlKeys.length) errors.push('Set MYSQL_HOST, MYSQL_USER and MYSQL_DATABASE together.');
if (mysqlSet.length === 0) {
  const directory = process.env.DATA_DIR;
  if (!directory || !path.isAbsolute(directory)) errors.push('Set MySQL credentials or an absolute DATA_DIR on a persistent disk.');
  else {
    try { accessSync(directory, constants.R_OK | constants.W_OK); }
    catch { errors.push('DATA_DIR must exist and be readable and writable by the application.'); }
  }
}
if (errors.length) {
  console.error('Production configuration needs attention:\n' + errors.map(error => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else console.log('Production environment checks passed.');
