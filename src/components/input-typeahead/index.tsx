import React from 'react';
import { Form } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import {
  RenderMenuProps
} from 'react-bootstrap-typeahead/types/components/Typeahead';
import {
  RenderMenuItemChildren
} from 'react-bootstrap-typeahead/types/components/TypeaheadMenu';
import {
  Option,
  TypeaheadManagerChildProps
} from 'react-bootstrap-typeahead/types/types';
import './index.css';

export interface IInputTypeaheadProps {
  children: string | JSX.Element | JSX.Element[];
  type: string;
  name: string;
  id: string;
  value?: string | number | string[] | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  onSelect?: (selected: Option[]) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onSearch: (query: string) => void;
  renderMenuItemChildren?: RenderMenuItemChildren | undefined;
  renderMenu?:
    | ((
        results: Option[],
        menuProps: RenderMenuProps,
        state: TypeaheadManagerChildProps
      ) => JSX.Element)
    | undefined;
  labelKey: string;
  options: Option[];
  isLoading: boolean;
  isInvalid?: boolean | undefined;
  isValid?: boolean | undefined;
  showErrorMessage?: boolean;
  errorMessage?: string | undefined;
  emptyLabel?: React.ReactNode;
  promptText?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const InputTypeahead = ({
  children,
  type,
  name,
  id,
  value,
  options,
  labelKey,
  onChange,
  onSelect,
  onBlur,
  onSearch,
  renderMenu,
  renderMenuItemChildren,
  emptyLabel,
  promptText,
  isInvalid,
  isValid,
  isLoading,
  errorMessage,
  showErrorMessage = false,
  ...otherProps
}: IInputTypeaheadProps) => (
  <Form.Group {...otherProps}>
    <Form.Label>{children}</Form.Label>
    <AsyncTypeahead
      filterBy={() => true}
      labelKey={labelKey}
      id={id}
      inputProps={{ name }}
      multiple={false}
      isLoading={isLoading}
      onChange={onSelect}
      selected={[{ [labelKey]: value }]}
      onInputChange={(text, event) => {
        if (onChange !== undefined) {
          onChange(event);
        }
        onSearch(text);
      }}
      onBlur={onBlur}
      onSearch={onSearch}
      isValid={isValid}
      isInvalid={isInvalid}
      emptyLabel={emptyLabel}
      promptText={promptText}
      options={options}
      renderMenuItemChildren={renderMenuItemChildren}
      renderMenu={renderMenu}
    />
    {showErrorMessage && isInvalid ? (
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    ) : null}
  </Form.Group>
);

export default InputTypeahead;
