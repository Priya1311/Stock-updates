/*
 * File: tick.ts
 * Project: deriv-assignment
 * File Created: Friday, 21st April 2023 8:46:04 pm
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 12:07:40 am
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */
import { logToConsole } from 'src/utilities/logger';
import { api, connection } from '../socket';
import { IActiveSymbolInfo } from '../models/deriv.model';

// @ts-ignore
const tickResponse = async (res) => {
  const data = JSON.parse(res.data);
  if (data.error !== undefined) {
    console.log('Error : ', data.error.message);
    // @ts-ignore
    connection.removeEventListener('message', tickResponse, false);
    // await api.disconnect();
  }
  if (data.msg_type === 'tick') {
    console.log(data.tick);
  }
  return data;
};

const subscribeTicks = async (active_symbols_data: string[]) => {
  console.log('*****', active_symbols_data);
  connection.addEventListener('message', tickResponse);
  return await api.subscribe({ ticks: active_symbols_data });
};

const unsubscribeTicks = (active_symbols_data: any) => {
  // @ts-ignore
  connection.removeEventListener('message', tickResponse, false);
  api.subscribe({ ticks: active_symbols_data }).unsubscribe();
};

export const TickService = { subscribeTicks, unsubscribeTicks };
