// websocket通信自定义hook
import { useEffect, useRef, useState } from "react";
import { TokenInfo, WebSocketMessage } from "../types/token";
import { decompressData } from "../utils/decompress";

export const useWebSocket = () => {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout>(null);

  const connect = () => {
    try {
      ws.current = new WebSocket("wss://web-t.pinkpunk.io/ws");
      ws.current.onopen = () => {
        setIsConnected(true);
        setError(null);
        console.log("WebSocket connected");
        // 订阅 trending 数据
        const subscribeMessage: WebSocketMessage = {
          topic: "trending",
          event: "sub",
          interval: "",
          pair: "",
          chainId: "56",
          compression: 0,
        };
        ws.current?.send(JSON.stringify(subscribeMessage));
      };
      ws.current.onmessage = (event) => {
        try {
          const rawData = event.data;
          let parsedData: WebSocketMessage;
          // 检查是否是压缩数据
          if (typeof rawData === "string" && rawData.includes("compression")) {
            parsedData = JSON.parse(rawData);
          } else {
            // 尝试解压缩
            const decompressed = decompressData(rawData);
            if (decompressed) {
              parsedData = JSON.parse(decompressed);
            } else {
              parsedData = JSON.parse(rawData);
            }
          }
          // 处理不同主题的消息
          switch (parsedData.topic) {
            case "trending":
              if (parsedData.data) {
                setTokens(parsedData.data);
              }
              break;
            case "ping":
              // 响应心跳
              const pongMessage: WebSocketMessage = {
                topic: "pong",
                event: "sub",
                pong: parsedData.pong || Date.now().toString(),
                interval: "",
                pair: "",
                chainId: "",
                compression: 1,
              };
              ws.current?.send(JSON.stringify(pongMessage));
              break;
            default:
              console.log("Unknown topic:", parsedData.topic);
          }
        } catch (error) {
          console.error("Error processing message:", error);
        }
      };
      ws.current.onclose = () => {
        setIsConnected(false);
        console.log("WebSocket disconnected");
        // 尝试重连
        reconnectTimeout.current = setTimeout(() => {
          connect();
        }, 3000);
      };
      ws.current.onerror = (error) => {
        setError("WebSocket error occurred");
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      setError("Failed to connect to WebSocket");
      console.error("Connection error:", error);
    }
  };

  const disconnect = () => {
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
    }
    if (ws.current) {
      ws.current.close();
    }
  };

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  return { tokens, isConnected, error, reconnect: connect };
};
