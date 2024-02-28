//@ts-ignore
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../components/Button/Button";
import { Form } from "../../Form";
import { toggleModal, isOpenModalState } from "../../redux/slices/ModalState";
import "../../__reset.scss";

export default function Home() {
  const isOpen = useSelector(isOpenModalState);
  const dispatch = useDispatch();
  const setIsOpen = () => {
    dispatch(toggleModal());
  };
  return (
    <>
      {isOpen ? <Form type="AuthForm" /> : null}
      <Button
        text="Авторизоваться"
        name="primary"
        onClick={() => setIsOpen()}
      />
      <h2>для авторизации</h2>
      <p>admin@gmail.com</p>
      <p>12345</p>
    </>
  );
}
