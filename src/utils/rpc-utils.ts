/* eslint-disable @typescript-eslint/no-unsafe-return */

import { HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

function toSafeString(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean')
    return String(value);

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value) ?? Object.prototype.toString.call(value);
    } catch {
      return Object.prototype.toString.call(value);
    }
  }

  return Object.prototype.toString.call(value);
}

function getNested<T = unknown>(obj: unknown, path: string[]): T | undefined {
  let cur = obj;
  for (const p of path) {
    if (
      cur &&
      typeof cur === 'object' &&
      p in (cur as Record<string, unknown>)
    ) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return cur as T | undefined;
}

function getNestedString(obj: unknown, path: string[]): string | undefined {
  const v = getNested<unknown>(obj, path);
  if (v === undefined || v === null) return undefined;
  return toSafeString(v);
}

function getNestedNumber(obj: unknown, path: string[]): number | undefined {
  const v = getNested<unknown>(obj, path);
  if (v === undefined || v === null) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export function extractRpcError(err: unknown): {
  message: string;
  status: number;
} {
  if (err instanceof Error) {
    return { message: err.message, status: 500 };
  }

  const message =
    getNestedString(err, ['message']) ??
    getNestedString(err, ['response', 'message']) ??
    getNestedString(err, ['error']) ??
    'Internal server error';

  const status =
    getNestedNumber(err, ['status']) ??
    getNestedNumber(err, ['response', 'status']) ??
    getNestedNumber(err, ['statusCode']) ??
    500;

  return { message, status };
}

export async function callClient<T = unknown>(
  client: ClientProxy,
  pattern: unknown,
  data?: unknown,
): Promise<T> {
  try {
    return await firstValueFrom(client.send<T>(pattern as any, data));
  } catch (err: unknown) {
    const { message, status } = extractRpcError(err);
    throw new HttpException(message, status);
  }
}
