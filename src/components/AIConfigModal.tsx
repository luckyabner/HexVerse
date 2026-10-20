"use client";

import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAIConfig, AIProvider, AIConfig } from "@/hooks/useAIConfig";
import { cn } from "@/lib/utils";

const PROVIDERS: { value: AIProvider; name: string; note: string }[] = [
  { value: "default", name: "智谱 GLM", note: "系统默认" },
  { value: "openai", name: "OpenAI 兼容", note: "gpt-4o-mini" },
  { value: "claude", name: "Claude", note: "Anthropic" },
  { value: "custom", name: "自定义", note: "任意兼容接口" },
];

const placeholders: Record<Exclude<AIProvider, "default">, { baseUrl: string; model: string }> = {
  openai: { baseUrl: "https://api.openai.com/v1", model: "gpt-4o-mini" },
  claude: { baseUrl: "https://api.anthropic.com", model: "claude-3-5-sonnet-20240620" },
  custom: { baseUrl: "https://your-api.com/v1", model: "model-id" },
};

export default function AIConfigModal() {
  const { config, saveConfig, mounted } = useAIConfig();
  const [localConfig, setLocalConfig] = useState<AIConfig>(config);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLocalConfig(config);
  }, [config, isOpen]);

  const handleSave = () => {
    saveConfig(localConfig);
    setIsOpen(false);
  };

  if (!mounted) return null;

  const provider = localConfig.provider;
  const hints = provider === "default" ? null : placeholders[provider];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 px-0 text-muted-foreground hover:text-foreground"
          title="AI 接口设置"
          aria-label="AI 接口设置"
        >
          <Settings className="h-4 w-4" strokeWidth={1.5} />
        </Button>
      </DialogTrigger>

      <DialogContent className="corner-frame sm:max-w-[440px]">
        <DialogHeader className="gap-2">
          <span className="label text-vermilion">AI 接口</span>
          <DialogTitle className="display text-[1.55rem] leading-none font-normal">
            模型配置
          </DialogTitle>
          <DialogDescription className="text-[0.8rem] leading-relaxed text-muted-foreground">
            选择用于解卦与命理分析的模型，配置仅保存在本机浏览器。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-1">
          <div>
            <div className="label text-muted-foreground">提供商</div>
            <div
              role="radiogroup"
              aria-label="AI 提供商"
              className="mt-3 grid grid-cols-2 gap-px bg-border"
            >
              {PROVIDERS.map((item) => {
                const active = provider === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() =>
                      setLocalConfig({ ...localConfig, provider: item.value })
                    }
                    className={cn(
                      "flex cursor-pointer flex-col items-start gap-1 px-3.5 py-3 text-left transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-accent",
                    )}
                  >
                    <span className="text-[0.85rem]">{item.name}</span>
                    <span
                      className={cn(
                        "label text-[0.6rem]",
                        active
                          ? "text-primary-foreground/45"
                          : "text-muted-foreground/50",
                      )}
                    >
                      {item.note}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {provider === "default" ? (
            <p className="border-l border-vermilion/40 pl-4 text-[0.8rem] leading-relaxed text-muted-foreground">
              使用系统默认的智谱 GLM 接口，无需额外配置。
            </p>
          ) : (
            <div className="space-y-5">
              <div>
                <label htmlFor="apiKey" className="label text-muted-foreground">
                  API Key
                </label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="sk-…"
                  className="mt-1"
                  value={localConfig.apiKey}
                  onChange={(e) =>
                    setLocalConfig({ ...localConfig, apiKey: e.target.value })
                  }
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="baseUrl" className="label text-muted-foreground">
                    Base URL
                  </label>
                  <span className="label text-[0.6rem] text-muted-foreground/45">
                    可选
                  </span>
                </div>
                <Input
                  id="baseUrl"
                  placeholder={hints?.baseUrl}
                  className="mt-1"
                  value={localConfig.baseUrl}
                  onChange={(e) =>
                    setLocalConfig({ ...localConfig, baseUrl: e.target.value })
                  }
                />
              </div>

              <div>
                <label htmlFor="model" className="label text-muted-foreground">
                  模型名称
                </label>
                <Input
                  id="model"
                  placeholder={hints?.model}
                  className="mt-1"
                  value={localConfig.model}
                  onChange={(e) =>
                    setLocalConfig({ ...localConfig, model: e.target.value })
                  }
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-5">
          <span className="label text-[0.6rem] text-muted-foreground/45">
            localStorage · hexverse_ai_config
          </span>
          <Button onClick={handleSave}>保存配置</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
