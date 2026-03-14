import { useState, useEffect } from 'react';

export type AIProvider = 'default' | 'openai' | 'claude' | 'custom';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  baseUrl: string;
  model: string;
}

export const DEFAULT_CONFIG: AIConfig = {
  provider: 'default',
  apiKey: '',
  baseUrl: '',
  model: '',
};

export function useAIConfig() {
  const [config, setConfig] = useState<AIConfig>(DEFAULT_CONFIG);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('hexverse_ai_config');
    if (stored) {
      try {
        setConfig(JSON.parse(stored));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const saveConfig = (newConfig: AIConfig) => {
    setConfig(newConfig);
    localStorage.setItem('hexverse_ai_config', JSON.stringify(newConfig));
  };

  return { config, saveConfig, mounted };
}

// 供非 Hook 环境（如直接在事件处理函数中）快速读取
export const getAIConfigFromStorage = (): AIConfig => {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  const stored = localStorage.getItem('hexverse_ai_config');
  if (stored) {
    try {
      return JSON.parse(stored) as AIConfig;
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  }
  return DEFAULT_CONFIG;
};
