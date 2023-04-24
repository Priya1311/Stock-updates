/*
 * File: Column.ts
 * Project: deriv-assignment
 * File Created: Sunday, 23rd April 2023 9:54:43 pm
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 12:41:23 am
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

//  all the components share the same column types, hence defining it here for all the tabs at once.
export const Columns = [
  { id: 'display_name', label: 'Name', minWidth: 100 },
  {
    id: 'price',
    label: 'Value ($)',
    minWidth: 100,
    sortable: true,
  },
  { id: 'chartData', label: 'Chart', minWidth: 100, chart: true },
  { id: 'action', label: 'Action', minWidth: 100 },
];
