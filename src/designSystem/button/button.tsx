import React from 'react';
import Button from '@material-ui/core/Button';
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
        <Button disabled={disabled} onClick={onClick} size={size} classes={classes}>
            {label}
        </Button>
  );
};

export default GradientBtn;