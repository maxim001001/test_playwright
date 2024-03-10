// AuthForm.tsx
import React from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleModalState } from "../../redux/slices/ModalState";
import { toggleUserLogin } from "../../redux/slices/UserState";
import { mockRequest, type IAuthRequest } from "../../mockRequest";
import { validateEmail, validatePassword } from "../utils/validate";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import styles from "./AuthForm.module.scss";

interface FormValues {
  email: string;
  password: string;
}

interface FormField {
  name: keyof FormValues;
  type: string;
  placeholder: string;
  label: string;
  validate: (value: any) => string | undefined;
}

const formFields: FormField[] = [
  {
    name: "email",
    type: "mail",
    placeholder: "Почта",
    label: "Электронная почта",
    validate: validateEmail,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Пароль",
    label: "Введите пароль",
    validate: validatePassword,
  },
];

export const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data: IAuthRequest) => {
    const request = mockRequest(data);
    if (request) {
      dispatch(toggleUserLogin());
      dispatch(toggleModalState());
      navigate("/dashboard");
    }
  };

  return (
    <div className={styles.form} data-testid="auth-form">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            {formFields.map(({ name, type, placeholder, label, validate }) => (
              <label key={name} className={styles.inputTitle}>
                {label}
                <Input
                  className={styles.Field}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  validate={validate}
                  formik
                />
              </label>
            ))}
            <Button
              text="Отправить"
              name="primary"
              type="submit"
              disabled={isSubmitting || !isValid}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
