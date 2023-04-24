/*
 * File: CustomTable.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 1:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:03:23 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import React from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomChart from '../CustomChart/CustomChart';
import { Button } from '@mui/material';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: TableCellProps['align'];
  chart?: boolean;
  sortable?: boolean;
}

interface Data {
  [key: string]: any;
}

interface Props {
  columns: Column[];
  data: Data[];
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

const CustomTable = (props: Props) => {
  const { columns, data } = props;
  const classes = useStyles();

  const [sort, setSort] = React.useState({ column: '', direction: '' });

  const handleSort = (column: string) => {
    let direction = 'asc';
    if (sort.column === column && sort.direction === 'asc') {
      direction = 'desc';
    }
    setSort({ column, direction });
  };

  const sortedData = React.useMemo(() => {
    if (sort.column === '') {
      return data;
    }
    return [...data].sort((a, b) => {
      const column = columns.find((c) => c.id === sort.column);
      const aValue = a[column?.id || ''];
      const bValue = b[column?.id || ''];
      if (typeof aValue === 'string') {
        return sort.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return sort.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }, [data, sort, columns]);

  const trade = (selected: any) => {
    alert(`Trading ${selected.symbol} for ${selected.price}`);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='Resuable Table'>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
                onClick={() => column.sortable && handleSort(column.id)}
              >
                {column.label}
                {column.sortable && (
                  <span>
                    {sort.column === column.id ? (sort.direction === 'asc' ? ' ▲' : ' ▼') : ''}
                  </span>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => {
            return (
              <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  if (column.chart) {
                    return (
                      <>
                        <TableCell key={column.id} align={column.align}>
                          <div style={{ width: '150px', height: '80px' }}>
                            <CustomChart data={value} />
                          </div>
                        </TableCell>
                        <TableCell key={column.id + 1} align={column.align}>
                          <Button variant='outlined' onClick={() => trade(row)}>
                            TRADE
                          </Button>
                        </TableCell>
                      </>
                    );
                  }
                  return (
                    <TableCell key={column.id + 2} align={column.align}>
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default CustomTable;
