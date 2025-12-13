"use client";

import Select, { Props as SelectProps } from "react-select";

export default function ClientSelect<OptionType>(props: SelectProps<OptionType>) {
  return <Select {...props} />;
}
