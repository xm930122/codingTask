// 实现复制粘贴功能
import { useState } from 'react';

export const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        return true;
      } else {
        // 传统方法
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          const successful = document.execCommand('copy');
          setIsCopied(successful);
          setTimeout(() => setIsCopied(false), 2000);
          document.body.removeChild(textArea);
          return successful;
        } catch (err) {
        //   console.error('传统复制方法失败: ', err);
          document.body.removeChild(textArea);
          return false;
        }
      }
    } catch (err) {
    //   console.error('复制失败: ', err);
      return false;
    }
  };
  return { copyToClipboard, isCopied };
};