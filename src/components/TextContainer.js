import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setParas, setFormat, getTextAsync } from '../redux/textSlice';

export default function TextContainer() {

    const text = useSelector((state) => state.generateText.text);
    const paras = useSelector((state) => state.generateText.paras);
    const format = useSelector((state) => state.generateText.format);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getTextAsync({paras, format}));
    },  [paras, format, dispatch])

    return(
        <div className="container">
            {/* heading */}
            <h1>React text generator app</h1>
            <hr></hr>

            {/* inputs */}
            <div className="inputs">
                {/* Number of Paragraphs */}
                <div>
                    <label>Paragraphs</label>
                    <input 
                        onChange={(e) => dispatch(setParas(e.target.value))} 
                        type="number" min="1" max="100"
                        value={paras}
                        ></input>
                </div>
                {/* IncludeHTML */}
                <div className="htmlDiv">
                    <label>Include HTML</label>
                    <select onChange={(e) => dispatch(setFormat(e.target.value))} 
                        name="options"
                        id="options"
                        >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                </div>
            </div>

            {/* content */}
            <div className="textContainer">
                <p>{text}</p>
            </div>
        </div>
    )
}

