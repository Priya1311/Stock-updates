/*
 * File: SyntheticIndices.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:01:42 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { FC, useEffect, useState } from 'react';
import CustomChips from 'src/components/shared/CustomChip/CustomChip';
import CustomTable from 'src/components/shared/CustomTable/CustomTable';
import CircularLoader from 'src/components/shared/Loader/CircularLoader';
import NoDataPage from 'src/components/shared/NoDataPage/NoDataPage';
import { TickService } from 'src/services/tick';
import { TickHistory } from 'src/services/tick-history';
import { useDocumentTitle } from '../../../../hooks/custom-hooks/useDocumentTitle';
import { Columns } from '../../../shared/CustomTable/Column';
import { IActiveSymbolInfo, IChartData, IProps, IPrices } from '../../../../models/deriv.model';

const SyntheticIndices = (props: IProps) => {
  useDocumentTitle('Market: Synthetic-Indices');
  const { data } = props;
  const [tableData, setTableData] = useState(data);
  const symbolArr = tableData.map((data: IActiveSymbolInfo) => data.symbol);
  const [chartInfo, setChartInfo] = useState<IChartData>();
  const [prices, setPrices] = useState<IPrices>();
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleSelectChip = (label: string) => {
    setSelectedChips([...selectedChips, label]);
  };

  const handleDeselectChip = (label: string) => {
    setSelectedChips(selectedChips.filter((chipLabel) => chipLabel !== label));
  };

  const filterData = () => {
    if (selectedChips.length > 0) {
      const filteredData = data.filter((i: any) =>
        selectedChips.includes(i.submarket_display_name),
      );
      setTableData(filteredData);
    } else {
      setTableData(data);
    }
  };
  useEffect(() => {
    if (selectedChips) {
      filterData();
    }
  }, [selectedChips]);

  useEffect(() => {
    (async () => {
      const tickResponse = await TickService.subscribeTicks(symbolArr);
      tickResponse.subscribe((i: { tick: { symbol: string; quote: number } }) => {
        setPrices((prices): {} => ({
          ...prices,
          [i.tick.symbol]: i.tick.quote,
        }));
      });
    })();
  });

  const historyTicks = async () => {
    symbolArr.map(async (symbol: string) => {
      const ticks_history_request = {
        ticks_history: symbol,
        adjust_start_time: 1,
        count: 60,
        end: 'latest',
        start: 1,
        style: 'ticks',
      };
      const ticks_request = {
        ...ticks_history_request,
        subscribe: 1,
      };
      const response = await TickHistory.getTicksHistory(ticks_history_request, ticks_request);
      setChartInfo((previous: any) => ({
        ...previous,
        [symbol]: response.history,
      }));
    });
  };

  useEffect(() => {
    if (prices && Object.keys(prices).length > 0) {
      tableData.forEach((item: any) => {
        item.price = Number(prices[item.symbol]).toFixed(3);
      });
    }
  }, [prices]);

  useEffect(() => {
    if (chartInfo && Object.keys(chartInfo).length > 0) {
      tableData.forEach((item: any): void => {
        item.chartData = chartInfo[item.symbol];
      });
    }
  }, [chartInfo]);

  useEffect(() => {
    if (tableData.length > 0) {
      historyTicks();
    }
  }, [tableData]);

  return (
    <>
      {prices && Object.keys(prices).length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <CustomChips
            selectedChips={selectedChips}
            onSelectChip={handleSelectChip}
            onDeselectChip={handleDeselectChip}
            marketType={'SyntheticIndices'}
          />
          {tableData?.length ? (
            <CustomTable data={tableData} columns={Columns} />
          ) : (
            <CircularLoader />
          )}
        </div>
      ) : (
        <CircularLoader />

        // <NoDataPage />
      )}
    </>
  );
};

export default SyntheticIndices;
