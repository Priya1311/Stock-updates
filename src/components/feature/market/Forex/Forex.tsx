/*
 * File: Forex.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:01:27 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { useEffect, useState } from 'react';
import CustomChips from 'src/components/shared/CustomChip/CustomChip';
import CircularLoader from 'src/components/shared/Loader/CircularLoader';
import NoDataPage from 'src/components/shared/NoDataPage/NoDataPage';
import { TickService } from 'src/services/tick';
import { TickHistory } from 'src/services/tick-history';
import { useDocumentTitle } from '../../../../hooks/custom-hooks/useDocumentTitle';
import CustomTable from '../../../shared/CustomTable/CustomTable';
import { Columns } from '../../../shared/CustomTable/Column';
import { IProps, IPrices, IActiveSymbolInfo } from 'src/models';

const Forex = (props: IProps) => {
  useDocumentTitle('Market: Forex');
  const { data } = props;
  const [tableData, setTableData] = useState(data);
  const [prices, setPrices] = useState<IPrices>();
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [chartInfo, setChartInfo] = useState<any>();

  const symbolArray: string[] = data.map((data: IActiveSymbolInfo) => data.symbol);

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
      const tickRes = await TickService.subscribeTicks(symbolArray);
      tickRes.subscribe((i: any) => {
        setPrices((prices: any) => ({
          ...prices,
          [i.tick.symbol]: i.tick.quote,
        }));
      });
    })();
  });

  const historyTicks = async () => {
    symbolArray.map(async (symbol: string) => {
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
      const res = await TickHistory.getTicksHistory(ticks_history_request, ticks_request);
      setChartInfo((prev: any) => ({
        ...prev,
        [symbol]: res.history,
      }));
    });
  };

  useEffect(() => {
    if (prices && Object.keys(prices).length > 0)
      tableData.forEach((item: any) => {
        item.price = Number(prices[item.symbol]).toFixed(3);
      });
  }, [prices]);

  useEffect(() => {
    if (chartInfo && Object.keys(chartInfo).length > 0) {
      data.forEach((item: any): void => {
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
            marketType={'Forex'}
          />
          {tableData?.length ? (
            <CustomTable data={tableData} columns={Columns} />
          ) : (
            <CircularLoader />
          )}
        </div>
      ) : (
        // <CircularLoader />
        <NoDataPage />
      )}
    </>
  );
};

export default Forex;
