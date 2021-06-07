import React from "react";
import useStyle from "./changeDateStyle";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

interface ChangeDataInterface {
    onNextClick: () => void;
    onPreviousClick: () => void;
    label: React.ReactNode;
    city: string;
    dateNumber: number;
    disabled: boolean;
    maxDate: number;
}

export default function ChangeDate({disabled, onNextClick, onPreviousClick, label, city, dateNumber, maxDate}: ChangeDataInterface) {
    const classes = useStyle();

    return (
        <>
        <div className={classes.title}>{city}</div>
        {!disabled &&
            <div className={classes.flex}>
                <div 
                onClick={onPreviousClick}>
                    <NavigateBeforeIcon className={classes.chevron} style={{color: dateNumber !== 1 ? "black" : "grey"}} fontSize="large" />
                </div>
            <div className={classes.label}>
            {label}
            </div>  
                <div className={classes.flex}
                onClick={onNextClick}>
                    <NavigateNextIcon className={classes.chevron} style={{color: dateNumber !== maxDate ? "black" : "grey"}} fontSize="large" />
            </div>
        </div>
}
        </>
    );
}

