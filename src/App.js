import React, { useState, useTransition } from "react";
import { flushSync } from 'react-dom';
import "./App.css";

import Pythagoras from "./Pythagoras";

function App() {
    const svg = {
        width: 1280,
        height: 600,
    };
    const baseWidth = 80;
    const heightFactor = 0.4;
    const maxTreeSize = 22;

    // we split state in two so we can update
    // visuals and inputs separately
    const [treeSizeInput, setTreeSizeInput] = useState(8);
    const [treeSize, setTreeSize] = useState(8);

    const [treeLeanInput, setTreeLeanInput] = useState(0);
    const [treeLean, setTreeLean] = useState(0);
    const [isLeaning, startLeaning] = useTransition();

    const [enableStartTransition, setEnableStartTransition] = useState(false);
    const [enableSlowdown, setEnableSlowdown] = useState(false);

    // 验证自动批处理
    const [count, setCount] = useState(0)
    const [visible, setVisible] = useState(false)


    function changeTreeSize(event) {
        const value = Number(event.target.value);
        setTreeSizeInput(value); // update input

        // update visuals
        if (enableStartTransition) {
            React.startTransition(() => {
                setTreeSize(value);
            });
        } else {
            setTreeSize(value);
        }
    }

    function changeTreeLean(event) {
        const value = Number(event.target.value);
        setTreeLeanInput(value); // update input

        // update visuals
        if (enableStartTransition) {
            // startLeaning(() => {
            //     setTreeLean(value);
            // });
            React.startTransition(() => {
              setTreeLean(value);
          });
        } else {
            setTreeLean(value);
        }
    }

    function toggleStartTransition(event) {
        setEnableStartTransition(event.target.checked);
    }

    function toggleSlowdown(event) {
        setEnableSlowdown(event.target.checked);
    }

    const btnClick = () => {
      setCount(count + 1)
      console.log(visible)
      setVisible(!visible)
      // flushSync(() => {
      //   setCount(count + 1)
      // })
      
      // flushSync(() => {
      //   setVisible(!visible)
      // })
    }
    console.log('测试re-render')
    return (
        <div className="App">
          <div>
            {visible && <h4>批处理测试</h4>}
            <h4>{count}</h4>
            <button onClick={btnClick}>点击+1</button>
          </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                    <label>
                        使用 startTransition
                        <br />
                        <input
                            type="checkbox"
                            checked={enableStartTransition}
                            onChange={toggleStartTransition}
                        />
                    </label>
                </div>
                <div>
                    <label>树的倾斜度</label>
                    <br />
                    <input
                        type="range"
                        value={treeLeanInput}
                        onChange={changeTreeLean}
                        min="-0.5"
                        max="0.5"
                        step="0.05"
                        style={{ width: svg.width / 3 }}
                    />
                </div>
                <div>
                    <label>
                        Make each square block the thread for 0.1ms
                        <br />
                        <input
                            type="checkbox"
                            checked={enableSlowdown}
                            onChange={toggleSlowdown}
                        />
                    </label>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: 130 }}>
                    <label>
                        让树变大
                        <br />
                        越大越慢
                    </label>
                    <input
                        type="range"
                        value={treeSizeInput}
                        onChange={changeTreeSize}
                        min="0"
                        max={maxTreeSize}
                        step="1"
                        style={{
                            transform: `rotate(-90deg) translate(-${
                                svg.height / 2
                            }px, -90px)`,
                            width: svg.height / 2,
                        }}
                    />
                </div>

                <svg
                    width={svg.width}
                    height={svg.height}
                    className={isLeaning ? "pending" : "done"}
                    style={{
                        border: "1px solid lightgray",
                    }}
                >
                    <Pythagoras
                        enableSlowdown={enableSlowdown}
                        w={baseWidth}
                        h={baseWidth}
                        heightFactor={heightFactor}
                        lean={-treeLean}
                        x={svg.width / 2 - 40}
                        y={svg.height - baseWidth}
                        lvl={0}
                        maxlvl={treeSize}
                    />
                </svg>
            </div>
        </div>
    );
}

export default App;