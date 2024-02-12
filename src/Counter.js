import React, { useState } from "react";
import { PrimaryButton } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import { SwatchColorPicker } from "@fluentui/react";
import { Separator } from '@fluentui/react/lib/Separator';
import ReactECharts from "echarts-for-react";

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

    const option = {
        title: {
          text: 'TITLE'
        },
        tooltip : {
          trigger: 'axis'
        },
        legend: {
          data:['1','2','3']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            boundaryGap : false,
            data : ['data1','data2','data3','data4','data5','data5','data6']
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'name1',
            type:'line',
            stack: 'stack1',
            areaStyle: {normal: {}},
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'name2',
            type:'line',
            stack: 'stack2',
            areaStyle: {normal: {}},
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'name3',
            type:'line',
            stack: 'stack3',
            areaStyle: {normal: {}},
            data:[150, 232, 201, 154, 190, 330, 410]
          }
        ]
    };

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
            <Separator />
            <ReactECharts
                option={option}
                style={{ height: 400 }}
            />
        </>
    )
}

export default CounterEx;