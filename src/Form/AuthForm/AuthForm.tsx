import classnames from "classnames";
import { Formik, Form, Field, FieldProps } from "formik";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { validateEmail, validatePassword } from "../utils/validate";
import { type IAuthRequest, mockRequest } from "../../mockRequest";
//@ts-ignore
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
// @ts-ignore
import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/slices/ModalState";
import { toggleUserLogin } from "../../redux/slices/UserState";

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
  validate: (value: any) => string | undefined; // функция валидации
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
    label: "Пароль",
    validate: validatePassword,
  },
];

export const AuthForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (data: IAuthRequest) => {
    const request = mockRequest(data);
    if (request) {
      dispatch(toggleUserLogin());
      dispatch(toggleModal());
      navigate("/dashboard");
    }
  };
  return (
    <div className={styles.form} data-testid="auth-form">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form>
            {formFields.map(({ name, type, placeholder, label, validate }) => (
              <label
                key={name}
                className={classnames(styles.inputTitle, {
                  [styles.error]: errors[name] && touched[name],
                })}
              >
                {errors[name] && touched[name] ? errors[name] : label}
                <Field name={name} validate={validate}>
                  {({ field }: FieldProps<string>) => (
                    <Input
                      className={styles.Field}
                      {...field}
                      type={type}
                      placeholder={placeholder}
                      name={name}
                      validate={validate}
                    />
                  )}
                </Field>
              </label>
            ))}
            <Button text="Отправить" name="primary" type="submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
};
