"use client";

import React, { useState, useEffect } from "react";
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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useAIConfig, AIProvider, AIConfig } from "@/hooks/useAIConfig";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-11 h-11"
          title="AI 设置"
          aria-label="AI 设置"
        >
          <Settings className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">AI 设置</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>自定义 AI 配置</DialogTitle>
          <DialogDescription>
            您可以自定义用于解卦和分析的 AI 模型接口。配置将保存在本地浏览器中。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="provider" className="text-right">
              提供商
            </Label>
            <div className="col-span-3">
              <Select
                value={localConfig.provider}
                onValueChange={(value: AIProvider) =>
                  setLocalConfig({ ...localConfig, provider: value })
                }
              >
                <SelectTrigger id="provider">
                  <SelectValue placeholder="选择 AI 提供商" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">默认 (智谱 GLM-4)</SelectItem>
                  <SelectItem value="openai">OpenAI 兼容</SelectItem>
                  <SelectItem value="claude">Claude (Anthropic)</SelectItem>
                  <SelectItem value="custom">自定义</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {localConfig.provider === "default" ? (
            <div className="text-sm text-muted-foreground text-center py-4 bg-muted/50 rounded-md">
              当前使用系统默认的智谱 GLM-4 接口，无需额外配置。
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="apiKey" className="text-right">
                  API Key
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="sk-..."
                  className="col-span-3"
                  value={localConfig.apiKey}
                  onChange={(e) => setLocalConfig({ ...localConfig, apiKey: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="baseUrl" className="text-right">
                  Base URL
                </Label>
                <Input
                  id="baseUrl"
                  placeholder={
                    localConfig.provider === "openai"
                      ? "https://api.openai.com/v1"
                      : localConfig.provider === "claude"
                      ? "https://api.anthropic.com"
                      : "https://your-custom-api.com/v1"
                  }
                  className="col-span-3"
                  value={localConfig.baseUrl}
                  onChange={(e) => setLocalConfig({ ...localConfig, baseUrl: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="model" className="text-right">
                  模型名称
                </Label>
                <Input
                  id="model"
                  placeholder={
                    localConfig.provider === "openai"
                      ? "gpt-4o-mini"
                      : localConfig.provider === "claude"
                      ? "claude-3-5-sonnet-20240620"
                      : "custom-model-id"
                  }
                  className="col-span-3"
                  value={localConfig.model}
                  onChange={(e) => setLocalConfig({ ...localConfig, model: e.target.value })}
                />
              </div>
            </>
          )}
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>保存配置</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
