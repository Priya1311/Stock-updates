// @ts-ignore
/*
 * File: Home.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:08:20 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { FC, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';

import { useDocumentTitle } from '../hooks/custom-hooks';
import CustomTab from 'src/components/shared/CustomTab/CustomTab';
import Forex from '../components/feature/market/Forex/Forex';
import StockIndices from 'src/components/feature/market/StockIndices/StockIndicies';
import SyntheticIndices from 'src/components/feature/market/SyntheticIndices/SyntheticIndices';
import Cryptocurrency from '../components/feature/market/Cryptocurrency/Cryptocurrency';
import Commodity from '../components/feature/market/Commodity/Commodity';
import { ActiveSymbolService } from 'src/services/active-symbol';
import { IActiveSymbolInfo, MarketsType } from 'src/models';
import { IActiveSymbolResponse } from '../models/deriv.model';
import CircularLoader from 'src/components/shared/Loader/CircularLoader';

const Home: FC = () => {
  useDocumentTitle('Home');

  const [defaultTab, setDefaultTab] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const [marketData, setMarketdata] = useState<MarketsType>({
    forex: [],
    indices: [],
    synthetic_index: [],
    cryptocurrency: [],
    commodities: [],
  });

  const getMarketData = async () => {
    const activeSymbolResponse: IActiveSymbolResponse =
      await ActiveSymbolService.getActiveSymbols();
    filterBasedOnMarket(activeSymbolResponse?.active_symbols);
  };

  useEffect(() => {
    getMarketData();
  }, []);

  const filterBasedOnMarket = (marketInfo: IActiveSymbolInfo[]) => {
    const markets: MarketsType = {
      forex: [],
      indices: [],
      synthetic_index: [],
      cryptocurrency: [],
      commodities: [],
    };
    marketInfo.forEach((symbol: IActiveSymbolInfo): void => {
      // @ts-ignore
      markets[symbol.market].push(symbol);
    });
    setMarketdata(markets);
    setLoading(false);
  };

  const onTabChange = (val: number) => {
    setDefaultTab(val);
  };

  const tabs = [
    {
      label: 'Cryptocurrency',
      isHidden: false,
      id: 0,
      Component: <Cryptocurrency data={marketData.cryptocurrency} />,
    },
    {
      label: 'Forex',
      isHidden: false,
      id: 3,
      Component: <Forex data={marketData.forex} />,
    },
    {
      label: 'Synthetic Indices',
      isHidden: false,
      id: 1,
      Component: <SyntheticIndices data={marketData.synthetic_index} />,
    },
    {
      label: 'Stock Indices',
      isHidden: false,
      id: 2,
      Component: <StockIndices data={marketData.indices} />,
    },
    {
      label: 'Commodity',
      isHidden: false,
      id: 4,
      Component: <Commodity data={marketData.commodities} />,
    },
  ];

  return (
    <>
      {isLoading ? (
        <CircularLoader />
      ) : (
        <Stack spacing={2}>
          {marketData && (
            <section>
              <CustomTab tabs={tabs} onTabChange={onTabChange} defaultTab={defaultTab} />
            </section>
          )}
        </Stack>
      )}
    </>
  );
};

export default Home;
