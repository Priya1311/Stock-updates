/*
 * File: ChipData.ts
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:02:11 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

export const ChipData: { [key: string]: any } = {
  ['Forex']: [
    { id: 1, label: 'Major Pairs' },
    { id: 2, label: 'Minor Pairs' },
    { id: 3, label: 'Smart Fx' },
  ],
  ['SyntheticIndices']: [
    { id: '1', label: 'Crash/Boom Indices' },
    { id: '2', label: 'Daily Reset Indices' },
    { id: '3', label: 'Forex Basket' },
    { id: '4', label: 'Commodities Basket' },
    { id: '5', label: 'Jump Indices' },
    { id: '6', label: 'Step Indices' },
    { id: '7', label: 'Continuous Indices' },
  ],
  ['StockIndices']: [
    { id: '1', label: 'Asian indices' },
    { id: '2', label: 'European indices' },
    { id: '3', label: 'American indices' },
  ],
  ['Commodity']: [
    { id: '1', label: 'Metals' },
    { id: '2', label: 'Energy' },
  ],
};
