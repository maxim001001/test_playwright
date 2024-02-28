//@ts-ignore
import { useDispatch } from "react-redux";
import { FC, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { Modal } from "../Modal/Modal";
import { AuthForm } from "./AuthForm/AuthForm";
import { toggleModal } from "../redux/slices/ModalState";
import { AppDispatch } from "../redux/store";

import style from "./Form.module.scss";
import closeBtn from "../assets/svg/closeBtn.svg";

export interface IModalListProps {
  type?: "AuthForm";
}

export const Form: FC<IModalListProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const formRef = useRef(null);

  const ClickClose = () => {
    dispatch(toggleModal());
  };
  const Debounce = debounce(() => {
    ClickClose();
  }, 170);

  let modalTitle: string;
  switch (props.type) {
    case "AuthForm":
      modalTitle = "Авторизация";
      break;
  }

  useEffect(() => {
    const handleEscapeKey = (event: any) => {
      if (event.key === "Escape") {
        setHidden(`${style.FormBoxClose}`);
        setBackground(`${style.CloseBackground}`);
        Debounce();
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      //@ts-ignore
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setHidden("display-none");
        if (event.target) {
          setHidden(`${style.FormBoxClose}`);
          setBackground(`${style.CloseBackground}`);
          Debounce();
        } else {
          setBackground("");
        }
      }
    };
    window.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [Debounce]);

  const [isHidden, setHidden] = useState("");
  const [background, setBackground] = useState("");

  const close = () => {
    setTimeout(() => {
      setHidden(`${style.FormBoxClose}`);
      setBackground(`${style.CloseBackground}`);
      Debounce();
    }, 100);
  };

  const wrapperModal = () => {
    return (
      <div className={style.modalBox}>
        <h3>{modalTitle}</h3>
        {props.type === "AuthForm" && <AuthForm />}
      </div>
    );
  };

  return (
    <Modal>
      <div className={`${style.formContainer} ${background}`}>
        <div ref={formRef} className={`${style.FormBox} ${isHidden}`}>
          <div className={style.authForm}>{wrapperModal()}</div>
          <img
            onClick={() => close()}
            className={style.closeBtn}
            src={closeBtn}
            alt="close button"
          />
        </div>
      </div>
    </Modal>
  );
};
