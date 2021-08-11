/* eslint-disable no-restricted-globals */
import React from "react";
import useStyle from "./changeDateStyle";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import useWindowDimensions from "./useWindowDimensions";

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
    const { height, width } = useWindowDimensions();
    const realHeight = height > screen.availHeight ? screen.availHeight : height;
    const dateResponsive = realHeight < 800 && realHeight < width;
    return (
        <>
        {
            !disabled &&
            <>
            <div style={{fontSize: dateResponsive ? "1rem" : "3rem"}} className={classes.title}>{city}</div>

                <div className={classes.flex}>
                    <div
                    style={{pointerEvents: "all"}}
                    onClick={onPreviousClick}>
                        <NavigateBeforeIcon className={classes.chevron} style={{color: dateNumber !== 1 ? "black" : "grey", fontSize: dateResponsive ? "1.5rem" : "3rem"}} fontSize="large" />
                    </div>
                <div style={{height: dateResponsive ? "20px" : "55px", fontSize: dateResponsive ? "0.75rem" : "1.5rem"}} className={classes.label}>
                {label}
                </div>  
                    <div 
                    style={{pointerEvents: "all"}}
                    className={classes.flex}
                    onClick={onNextClick}>
                        <NavigateNextIcon className={classes.chevron} style={{color: dateNumber !== maxDate ? "black" : "grey", fontSize: dateResponsive ? "1.5rem" : "3rem"}} fontSize="large" />
                </div>
            </div>
    </>
        }

        </>
    );
}

