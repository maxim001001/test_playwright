//что бы просто визуально посмотреть на кнопки
import { FC, useState } from "react";
import { Button, IButton } from "../Button";

const buttonData: IButton[] = [
  { text: "primary", name: "primary" },
  { text: "disabled", name: "primary", disabled: true },
  { text: "default", name: "default" },
  { text: "dashed", name: "dashed" },
  { text: "text", name: "text" },
  { text: "link", name: "link" },
];

export const TestButtonOnPage: FC = () => {
  const [count, setCount] = useState<number>(0);
  const handleButtonClick = () => setCount((prev) => prev + 1);

  return (
    <div className="App">
      <h1>{count}</h1>
      <br />
      <div style={{ display: "flex", flexDirection: "column", width: "150px" }}>
        {buttonData.map((button, index) => (
          <Button
            key={index}
            onClick={() => handleButtonClick()}
            text={button.text}
            name={button.name}
            className={button.className}
            disabled={button.disabled}
          />
        ))}
      </div>
    </div>
  );
};
