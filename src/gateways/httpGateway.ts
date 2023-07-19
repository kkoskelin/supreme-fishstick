import {
  BadRequestError,
  InsufficientPrivilegesError,
  RequestCanceledError,
  ServerError,
  UnauthorizedError,
} from '../errors';
import axios, { AxiosError, RawAxiosRequestConfig } from 'axios';

const handleRequestException = (exception: AxiosError) => {
  if (exception.response) {
    if (exception.response.status >= 500) {
      throw new ServerError();
    } else if (exception.response.status == 401) {
      throw new UnauthorizedError();
    } else if (exception.response.status == 403) {
      throw new InsufficientPrivilegesError();
    } else if (exception.response.status >= 400) {
      throw new BadRequestError();
    }
  } else if (exception.name == 'CanceledError') {
    throw new RequestCanceledError();
  }
  throw new Error('An unknown error occurred');
};

async function post(
  requestUrl: string,
  payload?: unknown,
  options?: RawAxiosRequestConfig,
): Promise<unknown> {
  let result;
  try {
    result = await axios.post(requestUrl, payload, options);
  } catch (e) {
    handleRequestException(e as AxiosError);
  }
  return result?.data as unknown;
}

async function get(
  requestUrl: string,
  options: RawAxiosRequestConfig,
): Promise<unknown> {
  let result;
  try {
    result = await axios.get(requestUrl, options);
  } catch (e) {
    handleRequestException(e as AxiosError);
  }
  return result?.data as unknown;
}

async function put(
  requestUrl: string,
  payload?: unknown,
  options?: RawAxiosRequestConfig,
): Promise<unknown> {
  let result;
  try {
    result = await axios.put(requestUrl, payload, options);
  } catch (e) {
    handleRequestException(e as AxiosError);
  }
  return result?.data as unknown;
}

export const httpGateway = {
  get,
  post,
  put,
};
