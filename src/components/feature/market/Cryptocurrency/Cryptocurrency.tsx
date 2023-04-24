/*
 * File: Cryptocurrency.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:01:19 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { useEffect, useState } from 'react';
import CustomTable from 'src/components/shared/CustomTable/CustomTable';
import CircularLoader from 'src/components/shared/Loader/CircularLoader';
import NoDataPage from 'src/components/shared/NoDataPage/NoDataPage';
import { TickService } from 'src/services/tick';
import { TickHistory } from 'src/services/tick-history';
import { useDocumentTitle } from '../../../../hooks/custom-hooks/useDocumentTitle';
import { IActiveSymbolInfo, IPrices, IProps } from 'src/models';
import { Columns } from 'src/components/shared/CustomTable/Column';
import { IChartData } from '../../../../models/deriv.model';

const Cryptocurrency = (props: IProps) => {
  useDocumentTitle('Market: Cryptocurrency');
  const { data } = props;
  const [prices, setPrices] = useState<IPrices>();
  const [chartInfo, setChartInfo] = useState<IChartData>();
  const symbolArray = data.map((data: IActiveSymbolInfo) => data.symbol);

  useEffect(() => {
    (async () => {
      const tickResponse = await TickService.subscribeTicks(symbolArray);
      tickResponse.subscribe((i: { tick: { symbol: string; quote: number } }) => {
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
      const response = await TickHistory.getTicksHistory(ticks_history_request, ticks_request);
      setChartInfo((previous: any) => ({
        ...previous,
        [symbol]: response.history,
      }));
    });
  };

  useEffect(() => {
    if (prices && Object.keys(prices).length > 0)
      data.forEach((item: any) => {
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
    if (data.length > 0) {
      historyTicks();
    }
  }, [data]);

  return (
    <>
      {prices && Object.keys(prices).length > 0 ? (
        data?.length ? (
          <section style={{ marginTop: '30px' }}>
            <CustomTable data={data} columns={Columns} />
          </section>
        ) : (
          <CircularLoader />
        )
      ) : (
        // <NoDataPage />
        <CircularLoader />
      )}
    </>
  );
};

export default Cryptocurrency;
