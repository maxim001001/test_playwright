import { Button } from "../../components/Button/Button";
import { TestButtonOnPage } from "../../components/Button/helpers/TestButtonOnPage";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
// @ts-ignore
import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/slices/ModalState";
import { toggleUserLogin } from "../../redux/slices/UserState";

export default function DashBoard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(toggleUserLogin());
    navigate("/");
    setTimeout(() => {
      dispatch(toggleModal());
    }, 1000);
  };

  return (
    <>
      <div>
        <h1>Вы авторизованы</h1>
        <Button name="default" text="Выйти" onClick={() => handleLogOut()} />
      </div>
      <div>
        <h2>Варианты кнопок покрытые тестами</h2>
        <TestButtonOnPage />
      </div>
    </>
  );
}
