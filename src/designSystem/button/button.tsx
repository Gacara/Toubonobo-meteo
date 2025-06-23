import React from 'react';
import Button from '@mui/material/Button';
import useStyle from "./buttonStyle";

export interface buttonInterface{
    size?: "small" | "medium" | "large";
    label: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
}
function GradientBtn({size="medium", label, onClick, disabled}: buttonInterface) {
  const classes = useStyle();
  return (
        <Button onClick={onClick} size={size} classes={classes} disabled={disabled}>
            {label}
        </Button>
  );
};

export default GradientBtn;