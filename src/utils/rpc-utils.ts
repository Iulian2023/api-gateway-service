import { HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export function extractRpcError(err: unknown): { message: string; status: number } {
  const anyErr = err as any;
  const message =
    (typeof anyErr?.message === 'string' && anyErr.message) ||
    anyErr?.response?.message ||
    anyErr?.error ||
    'Internal server error';
  const status =
    Number(anyErr?.status) ||
    Number(anyErr?.response?.status) ||
    Number(anyErr?.statusCode) ||
    500;
  return { message, status: isNaN(status) ? 500 : status };
}

export async function callClient<T = any>(
  client: ClientProxy,
  pattern: any,
  data?: any,
): Promise<T> {
  try {
    return await firstValueFrom(client.send<T>(pattern, data));
  } catch (err: unknown) {
    const { message, status } = extractRpcError(err);
    throw new HttpException(message, status);
  }
}