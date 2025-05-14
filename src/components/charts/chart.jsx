
// src/components/ui/chart.jsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

const ChartContainer = React.forwardRef(
  ({ config, className, children, ...props }, ref) => {
    const cssVariables = React.useMemo(() => {
      const styles = {};
      Object.entries(config).forEach(([key, value]) => {
        if (value.color) {
          styles[`--color-${key}`] = value.color;
        } else if (value.theme) {
          styles[`--color-${key}`] = value.theme.light;
          styles[`--color-${key}-dark`] = value.theme.dark;
        }
      });
      return styles;
    }, [config]);

    return (
      <div
        ref={ref}
        className={cn("chart-container relative w-full", className)}
        style={cssVariables}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ChartContainer.displayName = "ChartContainer";

const ChartTooltip = ({ content, cursor = true }) => {
  return (
    <Slot>
      {React.cloneElement(content, { cursor })}
    </Slot>
  );
};
ChartTooltip.displayName = "ChartTooltip";

const ChartTooltipContent = React.forwardRef(
  (
    {
      className,
      labelKey,
      nameKey,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "chart-tooltip bg-background border border-border rounded-md p-2 shadow-md",
          className
        )}
        {...props}
      >
        {(payload) => {
          if (!payload?.length) return null;

          const data = payload[0];
          const { payload: tooltipData } = data;

          return (
            <div>
              {!hideLabel && labelKey && tooltipData[labelKey] && (
                <div className="text-sm font-medium text-muted-foreground">
                  {tooltipData[labelKey]}
                </div>
              )}
              {payload.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm"
                >
                  {!hideIndicator && (
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        indicator === "line" && "h-px w-4",
                        indicator === "dashed" && "h-px w-4 border-t border-dashed"
                      )}
                      style={{ backgroundColor: entry.color }}
                    />
                  )}
                  <span className="text-muted-foreground">
                    {nameKey ? tooltipData[nameKey] : entry.name}
                  </span>
                  <span className="font-medium">{entry.value}</span>
                </div>
              ))}
            </div>
          );
        }}
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend = ({ content }) => {
  return <Slot>{content}</Slot>;
};
ChartLegend.displayName = "ChartLegend";

const ChartLegendContent = React.forwardRef(
  ({ className, nameKey, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("chart-legend flex flex-wrap gap-2", className)}
        {...props}
      >
        {(payload) =>
          payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-1 text-sm">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span>{nameKey ? entry.payload[nameKey] : entry.value}</span>
            </div>
          ))
        }
      </div>
    );
  }
);
ChartLegendContent.displayName = "ChartLegendContent";

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};
