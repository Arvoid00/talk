"use client";

import React from "react";
import { models, types } from "../../constants/models";
import {
  Select,
  type SelectProps,
  SelectGroup,
  SelectGroupLabel,
  SelectItem
} from "../core/form/Select";

export const ModelSelector: React.FC<SelectProps> = (props) => (
  <Select aria-label="Select a model" {...props}>
    {types.map((modelType) => (
      <SelectGroup key={modelType}>
        <SelectGroupLabel>{modelType}</SelectGroupLabel>
        {models.reduce((nodes, { id, name, type }) => {
          if (modelType === type) {
            nodes.push(
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            );
          }
          return nodes;
        }, [] as React.ReactNode[])}
      </SelectGroup>
    ))}
  </Select>
);
