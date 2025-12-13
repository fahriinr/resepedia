"use client";

import { useId } from "react";
import Select, { Props as SelectProps } from "react-select";

export default function ClientSelect<OptionType>(props: SelectProps<OptionType>) {
  const instanceId = useId();
  return <Select {...props} instanceId={instanceId} />;
}
