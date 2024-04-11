import Layout from "@theme/Layout";
import { FormulaScript } from "formula-script";
import {useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import hljs from "highlight.js";
import "highlight.js/styles/default.min.css";

export default function Demo() {
    
    const [input, setInput] = useState("SUMRANGE(A1:J3)");
    const [output, setOutput] = useState<string | boolean | number>("");
    const highlightedRange = useRef(hljs.highlight(`i.current.setRangeHandler((left : string, right: string) => {
    const colLeft = left[0];
    const rowLeft = Number(left[1]);
    const colRight = right[0];
    const rowRight = Number(right[1]);
    const cell2index = {
        "A": 0,
        "B": 1,
        "C": 2,
        "D": 3,
        "E": 4,
        "F": 5,
        "G": 6,
        "H": 7,
        "I": 8,
        "J": 9
    }
    const result = [];
    for(let i = cell2index[colLeft]; i <= cell2index[colRight]; i++) {
        for(let j = rowLeft - 1; j <= rowRight - 1; j++) {
            const element = dataSource[j][i];
            result.push(element);
        }
    }
    return result;
});`, {language: "js"}));
    const highlightedCellRef = useRef(hljs.highlight(`i.current.setCellRefHandler((cellName, fail) => {
    if(cellName.length > 2) fail('Wrong cell reference');
    const col = cellName[0];
    const row = Number(cellName[1]);
    const cell2index = {
        "A": 0,
        "B": 1,
        "C": 2,
        "D": 3,
        "E": 4,
        "F": 5,
        "G": 6,
        "H": 7,
        "I": 8,
        "J": 9
    }
    return dataSource[row - 1][cell2index[col]];
});`, {language: "js"}));

    const dataSource = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    ]
    const i = useRef(new FormulaScript);

    useEffect(() => {
        i.current.setRangeHandler((left : string, right: string) => {
            const colLeft = left[0];
            const rowLeft = Number(left[1]);
            const colRight = right[0];
            const rowRight = Number(right[1]);
            const cell2index = {
                "A": 0,
                "B": 1,
                "C": 2,
                "D": 3,
                "E": 4,
                "F": 5,
                "G": 6,
                "H": 7,
                "I": 8,
                "J": 9
            }
            const result = [];
            for(let i = cell2index[colLeft]; i <= cell2index[colRight]; i++) {
                for(let j = rowLeft - 1; j <= rowRight - 1; j++) {
                    const element = dataSource[j][i];
                    result.push(element);
                }
            }
            return result;
        });
        i.current.setCellRefHandler((cellName, fail) => {
            if(cellName.length > 2) fail('Wrong cell reference');
            const col = cellName[0];
            const row = Number(cellName[1]);
            const cell2index = {
                "A": 0,
                "B": 1,
                "C": 2,
                "D": 3,
                "E": 4,
                "F": 5,
                "G": 6,
                "H": 7,
                "I": 8,
                "J": 9
            }
            return dataSource[row - 1][cell2index[col]];
        });
    }, []);

    useEffect(() => {
        try {
            const output = i.current.run(input);
            if(output instanceof Date) {
                setOutput(dayjs(output).format("DD/MM/YYYY"));
            } else if(typeof output == "boolean") {
                setOutput(output ? "TRUE" : "FALSE");
            } else if(Array.isArray(output)) {
                setOutput(String(output));
            } else {
                setOutput(output);
            }
        } catch (error) {
            if(error instanceof Error) setOutput(error.message);
        }
    }, [input]);

    const handleTextAreaChange = (e : any) => {
        setInput(e.target.value);
    }

    return <Layout title="Test">
        <main>
            <div className="container" style={{marginTop: 20}}>
                <h1>Demo</h1>
                <div>
                    <h4 style={{marginBottom: 0}}>Input</h4>
                    <div className="col-md-6" style={{width: "100%", height: "100%", marginRight: 5}}>
                        <textarea onChange={handleTextAreaChange} style={{width: "100%", height: "100%"}} value={input}></textarea>
                    </div>
                    <h4 style={{marginBottom: 0}}>Output</h4>
                    <div className="col-md-6" style={{width: "100%", backgroundColor: "#f5f5f5"}}>
                        { output }
                    </div>
                </div>
                <br />
                <h4>My Spreadsheet</h4>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                            <th>D</th>
                            <th>E</th>
                            <th>F</th>
                            <th>G</th>
                            <th>H</th>
                            <th>I</th>
                            <th>J</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {dataSource.map((row, i) => (
                            
                            <tr key={i}>
                                <td><b>{i + 1}</b></td>
                                {row.map(cell => (
                                    <td key={cell}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                            
                    </tbody>
                </table>
                <h4>Define a range handler</h4>
<pre>
<code className="language-js" dangerouslySetInnerHTML={{__html: highlightedRange.current.value}} ></code>
</pre>
                <div>
                    <h4>Define a cell reference handler</h4>
<pre>
<code className="language-js" dangerouslySetInnerHTML={{__html: highlightedCellRef.current.value}}></code>
</pre>
                </div>
            </div>
        </main>
    </Layout>
}