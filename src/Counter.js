import React, { useState } from "react";
import { PrimaryButton } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import { SwatchColorPicker } from "@fluentui/react";
import { Separator } from '@fluentui/react/lib/Separator';

function CounterEx() {
    //State: a counter value
    const [counter, setCounter] = useState(0);
    const [previewColor, setPreviewColor] = useState('');
    const baseId = useId('colorpicker');

    const colorCells = [
        { id: 'a', label: 'orange', color: '#ca5010' },
        { id: 'b', label: 'cyan', color: '#038387' },
        { id: 'c', label: 'blueMagenta', color: '#8764b8' },
        { id: 'd', label: 'magenta', color: '#881798' },
        { id: 'e', label: 'white', color: '#ffffff' },
    ];

    //Action: code that causes an update to the state when something happens
    const increment = () => {
        setCounter(prevCounter => prevCounter + 1)
    }

    const swatchColorPickerAction = (id, color) => {
        setPreviewColor(color);
    }

    //View: the UI definition
    return (
        <>
            <div>
                Value: {counter} <PrimaryButton text="Increment" onClick={increment} allowDisabledFocus />
            </div>
            <Separator />
            <div id={`${baseId}-disabled`} style={{ color: previewColor }}>Simple disabled circle swatch color picker:</div>
            <SwatchColorPicker 
                columnCount={colorCells.length}
                cellShape={'circle'}
                colorCells={colorCells}
                aria-labelledby={`${baseId}-disabled`}
                onCellFocused={swatchColorPickerAction}
            />
        </>
    )
}

export default CounterEx;