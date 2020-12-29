import React, { useContext } from "react";
import { MenuContext } from "../../contexts/menu-context";

export default function MenuButton() {
  const { onToggleIsOpen } = useContext(MenuContext);

  return <button onClick={onToggleIsOpen}>Toggle menu</button>;
}
