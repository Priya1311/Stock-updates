// @ts-ignore
/*
 * File: tick-history.ts
 * Project: deriv-assignment
 * File Created: Friday, 21st April 2023 10:20:09 pm
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 12:50:46 am
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */
import { logToConsole } from 'src/utilities/logger';
import { api, connection } from '../socket';

const tickSubscriber = (ticks_request: any) => api.subscribe(ticks_request);

const ticksHistoryResponse = async (res: any) => {
  const data = JSON.parse(res.data);
  if (data.error !== undefined) {
    logToConsole('Error : ', data.error.message);
    // @ts-ignore
    connection.removeEventListener('message', ticksHistoryResponse, false);
    // await api.disconnect();
  }
  if (data.msg_type === 'history') {
    logToConsole(data.history);
  }
  // @ts-ignore

  connection.removeEventListener('message', ticksHistoryResponse, false);
  return data;
};

const ticksResponse = async (res: any) => {
  const data = JSON.parse(res.data);
  // This example returns an object with a selected amount of past ticks.
  if (data.error !== undefined) {
    logToConsole('Error : ', data.error.message);
    // @ts-ignore

    connection.removeEventListener('message', ticksResponse, false);
    // await api.disconnect();
  }
  // Allows you to monitor ticks.
  if (data.msg_type === 'tick') {
    logToConsole(data.tick);
  }
};
// @ts-ignore
const unsubscribeTicks = async (ticks_request) => {
  // @ts-ignore

  connection.removeEventListener('message', ticksResponse, false);
  await tickSubscriber(ticks_request).unsubscribe();
};
// @ts-ignore

const getTicksHistory = async (ticks_history_request, ticks_request) => {
  connection.addEventListener('message', ticksResponse);
  await tickSubscriber(ticks_request);
  connection.addEventListener('message', ticksHistoryResponse);
  return await api.ticksHistory(ticks_history_request);
};

export const TickHistory = { getTicksHistory };
