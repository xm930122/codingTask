/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useMemo, Fragment } from "react";
import {
  TokenInfo,
  ColumnConfig,
  TrendingTokensTableProps,
  sortConfig,
} from "../types/token";
import { useClipboard } from "../hooks/useClipboard";
import { initialColumns, rowArr } from "./data";
import { formatNumber, formatPercentage, getPriceChangeColor } from "./utils";
import SortIcon from "../../public/sort-icon.svg";
import SearchIcon from "../../public/search-icon.svg";
import CopyIcon from "../../public/copy.svg";

export const TrendingTokensTable: React.FC<TrendingTokensTableProps> = ({
  tokens,
}) => {
  const columns: ColumnConfig[] = initialColumns;
  const [sortConfig, setSortConfig] = useState<sortConfig>({
    key: "volumeUsd24h",
    direction: "desc",
  });
  const [searchTerm] = useState("");
  const { copyToClipboard } = useClipboard();

  // 获取可见列
  const visibleColumns = useMemo(
    () => columns.filter((col) => col.visible),
    [columns]
  );

  // 搜索过滤
  const filteredTokens = useMemo(() => {
    if (!searchTerm) return tokens;
    return tokens.filter(
      (token) =>
        token.baseSymbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.baseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.dex.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tokens, searchTerm]);

  // 排序功能
  const sortedTokens = useMemo(() => {
    if (!sortConfig.key) return filteredTokens;
    return [...filteredTokens].sort((a: any, b: any) => {
      let aValue: any, bValue: any;
      switch (sortConfig.key) {
        case "transactions24h":
          aValue = a.count24h;
          bValue = b.count24h;
          break;
        default:
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
          break;
      }
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredTokens, sortConfig]);

  // 排序处理
  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "desc"
          ? "asc"
          : "desc",
    });
  };

  // 排序符号(TODO高亮需要svg对应的图)
  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <SortIcon className="w-3 h-3" />;
    }
    return sortConfig.direction === "asc" ? (
      <SortIcon className="w-3 h-3 text-up-blue-600" />
    ) : (
      <SortIcon className="w-3 h-3 text-down-blue-600" />
    );
  };

  // 搜索（TODO: 无法连接vpn，不太确定该功能交互，未做）
  const searchFunction = (tokenObj: any) => {
    console.log(tokenObj, "搜索功能～～");
  };

  // 复制
  const copyFunction = (val: string) => {
    copyToClipboard(val);
  };

  // 表格表头自定义
  const renderComButton = (column: ColumnConfig, key: string, idx: number) => {
    const { label } = column;
    const labelArr = label.split("$$$");
    const isMultiSort = labelArr.length > 0;
    const lable = isMultiSort
      ? idx !== 0
        ? `/${labelArr[idx]}`
        : labelArr[0]
      : column.label;
    return (
      <button
        key={key}
        onClick={() => column.sortable && handleSort(key)}
        disabled={!column.sortable}
        className={`group flex items-center ${!isMultiSort ? "w-full" : ""} ${
          column.align === "right"
            ? "justify-end"
            : column.align === "center"
            ? "justify-center"
            : "justify-start"
        } ${column.sortable ? "cursor-pointer" : "cursor-default"}`}
      >
        <span className="font-medium">{lable}</span>
        {column.sortable && (
          <span className="ml-1 flex-none rounded ">{getSortIcon(key)}</span>
        )}
      </button>
    );
  };

  // 表头标题
  const renderHeader = (column: ColumnConfig) => {
    const { key } = column;
    const splitArr = key.split("$$$");
    if (splitArr.length) {
      const dom = splitArr.map((it, idx) => renderComButton(column, it, idx));
      return <Fragment>{dom}</Fragment>;
    }
    return renderComButton(column, key, 0);
  };

  // 渲染单元格内容(TODO: 优化)
  const renderCellContent = (token: any, column: ColumnConfig) => {
    const { key, type } = column;
    const changeValue = token[`${key}` as keyof TokenInfo] as number;
    switch (type) {
      case "token":
        const info = token.info ? JSON.parse(token.info) : {};
        const { twitter = "pic", website } = info || {};
        return (
          <div className="text-primary flex items-center space-x-3">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-white font-bold text-sm">
              {/* nextjs Image需要配置src，mock假数据不清楚src域名，用image标签 */}
              {website ? (
                <img
                  className="h-8 w-8"
                  src={website}
                  alt={twitter}
                />
              ) : (
                token.baseSymbol.slice(0, 3)
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-primary flex items-center space-x-2">
                <span className="truncate span-class text-xs">
                  {token.baseSymbol}
                </span>
                <SearchIcon
                  className="w-3 h-3 search-icon"
                  onClick={() => searchFunction(token)}
                />
              </div>
              <div className="text-sm text-secondary flex items-center space-x-2">
                <span className="truncate span-class text-xs">
                  {token.baseToken}
                </span>
                <CopyIcon
                  className="w-4 h-4 copy-icon"
                  onClick={() => copyFunction(token.baseToken)}
                />
              </div>
            </div>
          </div>
        );
      case "price":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium">
            {`$${
              token.price < 0.01
                ? formatNumber(token.price, 5)
                : formatNumber(token.price, 4)
            }`}
          </span>
        );
      case "percent":
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium ${getPriceChangeColor(
              changeValue
            )}`}
          >
            {formatPercentage(changeValue)}
          </span>
        );
      case "number":
        return (
          <span className="inline-flex items-center text-xs font-medium text-primary">
            {formatNumber(changeValue)}
          </span>
        );
      case "transactions":
        return (
          <Fragment>
            <div className="text-sm font-medium text-primary flex justify-center items-center space-x-2">
              {token.count24h}
            </div>
            <div className="text-sm text-secondary flex justify-center items-center">
              <span className="truncate span-class text-xs text-upside">
                {token.buyCount24h}
              </span>
              <span className="span-class">/</span>
              <span className="truncate span-class text-xs text-downside">
                {token.sellCount24h}
              </span>
            </div>
          </Fragment>
        );
      case "special":
        const [k1, k2] = key.split("$$$");
        return (
          <Fragment>
            <div className="text-sm font-medium text-primary flex justify-center items-center space-x-2">
              {formatNumber(token[k1]) || "-"}
            </div>
            <div className="text-xs text-secondary flex justify-center items-center space-x-2">
              {`$${formatNumber(token[k2])}` || "-"}
            </div>
          </Fragment>
        );
      default:
        return (
          <span className="inline-flex items-center text-xs font-medium text-primary">
            {token[key] || "-"}
          </span>
        );
    }
  };

  if (tokens.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-background  rounded-lg border border-gray-200">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg shadow-lg">
      {/* 表格容器 */}
      <div className="overflow-x-auto border-b border-border">
        <table className="min-w-full table-custom">
          <thead className="bg-background border-b border-b-border">
            <tr>
              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  className={`px-2 py-2 text-sm font-medium text-primary-pink uppercase tracking-wider ${
                    column.align === "right"
                      ? "text-right"
                      : column.align === "center"
                      ? "text-center"
                      : "text-left"
                  } ${column.width ? `w-${column.width}` : ""} ${
                    column.key.includes("$$$") ? "th-special" : ""
                  }`}
                >
                  {renderHeader(column)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-background border-b border-b-border">
            {sortedTokens.map((token, index) => (
              <tr
                key={`${token.baseToken}-${index}`}
                className="hover-row border-b border-b-border"
              >
                {visibleColumns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-2 py-2 text-sm ${
                      column.align === "right"
                        ? "text-right"
                        : column.align === "center"
                        ? "text-center"
                        : "text-left"
                    } ${
                      column.key.startsWith("priceChange")
                        ? "whitespace-nowrap"
                        : ""
                    }`}
                  >
                    <div
                      className={`border-r border-r-border tdClass ${
                        column.align === "right"
                          ? rowArr.includes(column.type)
                            ? "flex justify-end column-class"
                            : "flex justify-end"
                          : ""
                      }`}
                    >
                      {renderCellContent(token, column)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
