/*
 * File: logger.ts
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:09:57 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

export const logToConsole = (message: any, ...optionalParams: any[]) => {
  if (import.meta.env.PROD) return;
  // eslint-disable-next-line no-console
  console.log(message, ...optionalParams);
};
