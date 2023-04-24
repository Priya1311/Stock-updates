// @ts-ignore
/*
 * File: active-symbol.ts
 * Project: deriv-assignment
 * File Created: Friday, 21st April 2023 7:20:31 pm
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 12:50:41 am
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */
import { api, connection } from '../socket';
import { logToConsole } from '../utilities/logger';
import { IActiveSymbolResponse } from '../models/deriv.model';
// Currently gets all available symbols.
const active_symbols_request = {
  active_symbols: 'full',
  product_type: 'basic',
};

const activeSymbolsResponse = async (res: any) => {
  const data = JSON.parse(res.data);

  if (data.error !== undefined) {
    console.log('Error : ', data.error?.message);
    // @ts-ignore
    connection.removeEventListener('message', activeSymbolsResponse, false);
    // await api.disconnect();
  }

  if (data.msg_type === 'active_symbols') {
    logToConsole(data);
    logToConsole(data.active_symbols);
  }
  // @ts-ignore
  connection.removeEventListener('message', activeSymbolsResponse, false);
  return data;
};

const getActiveSymbols = async (): Promise<IActiveSymbolResponse> => {
  connection.addEventListener('message', activeSymbolsResponse);
  return await api.activeSymbols(active_symbols_request);
};

export const ActiveSymbolService = { getActiveSymbols };
