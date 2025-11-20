import { ColumnConfig } from "../types/token";

/**
 *  表格表头配置
 * visible：便于后续表格列默认是否展示扩展，先保留该字段
 * sortable: Boolean判断是否可以排序
 * key和label是否包含$$$：有多组排序，通过$$$来展示样式，兼容排序方法
 * type: 用于统一表格列的样式
 * type: percent(百分比) | token（特殊功能）| number(数值) | transactions(两行数据,多重排序) | price ｜ special(key包含$$$两行数据) ｜ default(默认展示)
 */

// 多行数据
export const rowArr = ['transactions', 'special'];

export const initialColumns: ColumnConfig[] = [
  {
    key: "token",
    label: "Token",
    visible: true,
    sortable: false,
    align: "left",
    width: 200,
    type: "token",
  },
  {
    key: "baseDecimals",
    label: "Age",
    visible: true,
    sortable: true,
    align: "left",
    width: 100,
    type: "number",
  },
  {
    key: "liquidity$$$marketCap",
    label: "Liq$$$MC",
    visible: true,
    sortable: true,
    align: "left",
    width: 150,
    type: "special",
  },
  {
    key: "price",
    label: "Price",
    visible: true,
    sortable: true,
    align: "right",
    width: 200,
    type: "price",
  },
  {
    key: "priceChange24h",
    label: "24h chg %",
    visible: true,
    sortable: true,
    align: "right",
    width: 200,
    type: "percent",
  },
  {
    key: "transactions24h",
    label: "24h TXs",
    visible: true,
    sortable: true,
    align: "right",
    width: 200,
    type: "transactions",
  },
  {
    key: "volumeUsd24h",
    label: "24h Vol",
    visible: true,
    sortable: true,
    align: "right",
    width: 200,
    type: "number",
  },
  {
    key: "priceChange1m",
    label: "1m%",
    visible: true,
    sortable: true,
    align: "right",
    type: "percent",
  },
  {
    key: "priceChange5m",
    label: "5m%",
    visible: true,
    sortable: true,
    align: "right",
    type: "percent",
  },
  {
    key: "priceChange1h",
    label: "1h%",
    visible: true,
    sortable: true,
    align: "right",
    type: "percent",
  },
];
