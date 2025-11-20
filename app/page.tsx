"use client";
import { TrendingTokensTable } from "./components/TrendingTokensTableWithUI";
import { useWebSocket } from "./hooks/useWebSocket";
import { mockTokens } from "./mock/mock";

export default function Home() {
  const { tokens, isConnected, error, reconnect } = useWebSocket();

  // 没有vpn, mock假数据实现
  const filteredTokens = tokens.length === 0 ? mockTokens : tokens;

  return (
    <div className="min-h-screen bg-background  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Status 用于展示状态测试，调通之后可删除 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center ${isConnected ? "text-green-600" : "text-red-600"}`}
            >
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  isConnected ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm font-medium">
                {isConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
            <div className="text-sm text-gray-600">{tokens.length} tokens</div>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded">
                {error}
              </div>
            )}
          </div>
          {!isConnected && (
            <button
              onClick={reconnect}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reconnect
            </button>
          )}
        </div>
        {/* 表格组件 */}
        <TrendingTokensTable tokens={filteredTokens} />
      </div>
    </div>
  );
}
