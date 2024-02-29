// @ts-ignore
import styles from "./Button.module.scss";

export interface IButton {
  text: string;
  name: "primary" | "default" | "dashed" | "text" | "link";
  type?: "submit" | "button";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  id?: string;
}

export const Button: React.FC<IButton> = ({
  onClick,
  text,
  name,
  type,
  className,
  disabled,
  id,
}) => {
  const buttonClass = `${styles.button} ${styles[name]} ${className || ""}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type={type}
      id={id}
    >
      {text}
    </button>
  );
};
