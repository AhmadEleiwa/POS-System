import React, { FC, Key } from "react";
import Select from "../../Components/Select";
import useTheme from "../../context/Theme/useTheme";
import { keys } from "../../context/Theme/Palettes";

/**
 * ## Dashboard page
 * Dashboard page the page that allow the user or admins to manipulate users settings
 * And the system sittings
 */
const Dashboard: FC = () => {
  const theme = useTheme();
  return (
    <div>
      <div>
        <Select
          onChange={(value) => theme.changePalette(value.target.value as keys)}
          options={[
            { key: "dark", value: "dark" },
            { key: "primary", value: "white" },
            { key: "green", value: "green" },
            { key: "matrial", value: "matrial" },

          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
