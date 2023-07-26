"use client";

import React from "react";
import {
  HovercardAnchor,
  SelectArrow,
  useHovercardStore,
  useSelectStore
} from "@ariakit/react";
import { PiCaretUpDown } from "react-icons/pi";
import { models, types } from "../../constants/models";
import {
  type SelectProps,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectInput,
  SelectOptions
} from "../core/form/Select";
import { HoverCard } from "../core/HoverCard";

export const ModelSelector: React.FC<SelectProps> = (props) => {
  const hovercard = useHovercardStore({ placement: `left` });
  const select = useSelectStore(props);
  const state = select.useState();
  const peekedModel = models.find(
    ({ id }) =>
      id ===
      state.items.find(({ id: itemID }) => itemID === state.activeId)?.value
  );

  return (
    <>
      <SelectInput store={select} aria-label="Select a model">
        {state.value}
        <SelectArrow>
          <PiCaretUpDown />
        </SelectArrow>
      </SelectInput>
      <SelectOptions store={select} gutter={8}>
        {types.map((modelType) => (
          <SelectGroup key={modelType}>
            <SelectGroupLabel>{modelType}</SelectGroupLabel>
            {models.reduce((nodes, { id, name, type }) => {
              if (modelType === type) {
                nodes.push(
                  <HovercardAnchor key={id} store={hovercard}>
                    <SelectItem value={id}>{name}</SelectItem>
                  </HovercardAnchor>
                );
              }
              return nodes;
            }, [] as React.ReactNode[])}
          </SelectGroup>
        ))}
      </SelectOptions>
      {peekedModel ? (
        <HoverCard store={hovercard} flip="right" gutter={16}>
          <div className="grid gap-2">
            <h4 className="font-medium leading-none">{peekedModel.name}</h4>
            <div className="text-sm text-muted-foreground">
              {peekedModel.description}
            </div>
            <div className="mt-4 grid gap-2">
              <h5 className="text-sm font-medium leading-none">Strengths</h5>
              <ul className="text-sm text-muted-foreground">
                {peekedModel.strengths}
              </ul>
            </div>
          </div>
        </HoverCard>
      ) : null}
    </>
  );
};
