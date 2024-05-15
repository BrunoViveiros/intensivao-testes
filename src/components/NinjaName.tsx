import { type FC } from "react";

import { Button, Flex } from "antd";

export type NinjaNameProps = {
  ninjaName: string;
  onBackClick: () => void;
};

export const NinjaName: FC<NinjaNameProps> = ({ onBackClick, ninjaName }) => {
  return (
    <Flex vertical align="center" style={{ width: "420px" }}>
      <p style={{ textAlign: "center", fontSize: 28 }}>
        <strong>Seu nome é:</strong>&nbsp;
        <span data-testid="ninja-name">{ninjaName}</span>
      </p>

      <Button type="primary" onClick={() => onBackClick()}>
        Voltar
      </Button>
    </Flex>
  );
};
