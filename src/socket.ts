/*
 * File: socket.ts
 * Project: deriv-assignment
 * File Created: Friday, 21st April 2023 08:20:31 pm
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:11:13 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

// @ts-ignore
import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic.js';
import WebSocket from 'isomorphic-ws';
import { logToConsole } from './utilities/logger';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const connection = new WebSocket(`${baseUrl}?app_id=1089`);
const api = new DerivAPIBasic({ connection });

const createWebSocketConnection = async () => {
  await api.events.onConnectionOpen.subscribe(() => {
    logToConsole('Connection to Deriv API established');
  });

  await api.events.onConnectionError.subscribe((error: any) => {
    logToConsole(`Connection error: ${error.message}`);
  });

  await api.events.onConnectionClose.subscribe(() => {
    logToConsole('Connection to Deriv API closed');
  });

  await api.connect();
};

export { connection, api, createWebSocketConnection };
