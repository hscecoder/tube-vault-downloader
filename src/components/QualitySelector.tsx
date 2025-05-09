
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VideoFormat } from "../types";

interface QualitySelectorProps {
  formats: VideoFormat[];
  selectedFormat: string;
  onFormatChange: (formatId: string) => void;
  disabled?: boolean;
}

const QualitySelector: React.FC<QualitySelectorProps> = ({
  formats,
  selectedFormat,
  onFormatChange,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="quality-select"
        className="text-sm font-medium text-muted-foreground"
      >
        Select Quality
      </label>
      <Select
        disabled={disabled}
        value={selectedFormat}
        onValueChange={onFormatChange}
      >
        <SelectTrigger
          id="quality-select"
          className="w-full md:w-48"
        >
          <SelectValue placeholder="Select quality" />
        </SelectTrigger>
        <SelectContent>
          {formats.map((format) => (
            <SelectItem key={format.formatId} value={format.formatId}>
              {format.quality} ({format.resolution})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default QualitySelector;
