// @ts-ignore
import { type ValidationResult } from "./utils/validate";
import { FC } from "react";
import { Field } from "formik";

interface IField {
  className: string;
  name: string;
  type: string;
  placeholder: string;
  validate: ValidationResult;
}

export const Input: FC<IField> = ({
  className,
  name,
  type,
  placeholder,
  validate,
}) => {
  return (
    <>
      <Field
        className={className}
        name={name}
        type={type}
        placeholder={placeholder}
        validate={validate}
      />
    </>
  );
};
