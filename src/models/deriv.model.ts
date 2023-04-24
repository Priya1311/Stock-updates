/*
 * File: deriv.model.ts
 * Project: deriv-assignment
 * File Created: Sunday, 23rd April 2023 9:09:19 pm
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 12:43:04 am
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */
interface IEchoReq {
  active_symbols: string;
  product_type: string;
  req_id: number;
}

export interface IActiveSymbolResponse {
  active_symbols: IActiveSymbolInfo[];
  echo_req: IEchoReq;
  req_id: number;
  msg_type: string;
}

export interface IActiveSymbolInfo {
  price: string;
  chartData: { prices: Number[]; times: Date[] };
  allow_forward_starting: number;
  delay_amount: number;
  display_name: string;
  display_order: number;
  exchange_is_open: number;
  exchange_name: string;
  intraday_interval_minutes: number;
  is_trading_suspended: number;
  market: string;
  market_display_name: string;
  pip: number;
  quoted_currency_symbol: string;
  spot: number;
  spot_age: string;
  spot_percentage_change: string;
  spot_time: string;
  subgroup: string;
  subgroup_display_name: string;
  submarket: string;
  submarket_display_name: string;
  symbol: string;
  symbol_type: string;
}

export interface IMarketType {
  forex: IActiveSymbolInfo;
  indices: IActiveSymbolInfo;
  synthetic_index: IActiveSymbolInfo;
  cryptocurrency: IActiveSymbolInfo;
  commodities: IActiveSymbolInfo;
}

export type MarketsType = {
  [key in keyof IMarketType]: IMarketType[key][];
};

export interface IProps {
  data: IActiveSymbolInfo[];
}
export interface IPrices {
  [key: string]: string;
}

export interface IChartData {
  [key: string]: {
    prices: Number[];
    times: Date[];
  };
}
