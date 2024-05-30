import React from 'react';
import * as SortingAlgorithms from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 200


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 650));
        }
        this.setState({ array });
    }

    mergeSort() {
        const animations = SortingAlgorithms.getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? '#27173A' : '#F47B89';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {

    }

    heapSort() {

    }

    bubbleSort() {

    }

    render() {
        const { array } = this.state;

        return (
            <div className="visualizer-container">

                <div className="button-container">
                    <button className="control-button" onClick={() => this.resetArray()}>Generate New Array</button>
                    <button className="control-button" onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className="control-button" onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className="control-button" onClick={() => this.heapSort()}>Heap Sort</button>
                    <button className="control-button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </div>

                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{ height: `${value}px` }}></div>
                    ))}
                </div>

            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function arraysAreEqual(array1, array2) {
//     if (array1.length !== array2.length) return false;
//     for (let i = 0; i < array1.length; i++) {
//         if (array1[i] !== array2[i]) return false;
//     }
//     return true;
// }