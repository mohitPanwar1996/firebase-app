import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MsSelectProps = {
  label?: string;
  options: any;
  value?: any;
  onChange?: any;
  disabled?: boolean;
  triggerClass?: string;
  contentClass?: string;
  dropDownText?: string;
};
function MsSelect({
  label,
  options,
  value,
  onChange,
  disabled,
  triggerClass,
  contentClass,
  dropDownText,
}: MsSelectProps) {
  const [currentOption, setCurrentOption] = useState("");

  useEffect(() => {
    setCurrentOption(value);
  }, [value]);

  const onClickValueChange = (eventValue: any) => {
    setCurrentOption(eventValue);
    onChange && onChange(eventValue);
  };

  return (
    <div className="flex flex-col flex-1">
      <Select
        disabled={disabled}
        onValueChange={onClickValueChange}
        value={currentOption}
      >
        <SelectTrigger className={cn(triggerClass)}>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent className={cn(contentClass)}>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options?.map((option: any, idx: any) => (
              <SelectItem
                value={option.value}
                key={idx}
                className={cn(dropDownText)}
              >
                {option.label || option.value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default MsSelect;
