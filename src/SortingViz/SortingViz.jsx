import React, { Component } from 'react';
import Navbar from '../SortingViz/Navbar';
import './SortingViz.css';
import {MergeSortAnimation} from '../SortingAlgorithms/MergeSort'; 
import {BubbleSortAnimation} from '../SortingAlgorithms/BubbleSort';
import {SelectionSortAnimation} from '../SortingAlgorithms/SelectionSort';
import {QuickSortAnimation} from '../SortingAlgorithms/QuickSort';

const Primary_Color = 'turquoise';
const Speed_Of_Animation = 85; //in milliseconds
const Secondary_Color = 'Red';
const Color_After_Sorting = 'seagreen';


var initialSort = true;
var Total_time;

export default class Sorter extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        sortingOver: false,
      };
    }

    SortingOver = () => {
        let colorBars = document.getElementsByClassName("array-bar");
        var i =0;
        setTimeout( () => {
            for (i=0; i<colorBars.length; i++)
              colorBars[i].style.backgroundColor = Color_After_Sorting;
              this.setState({sortingOver: true});
        }, Total_time * Speed_Of_Animation);
    }

    mergeSort = (array) => {
        if (this.state.sortingOver || initialSort) {
            initialSort = false;
            this.setState({ sortingOver: false });
            const animations = MergeSortAnimation(array);
            
            for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColorChange = i % 3 !== 2;
    
            if (isColorChange) {
              const [barOneIdx, barTwoIdx] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              const barTwoStyle = arrayBars[barTwoIdx].style;
              const color = i % 3 === 0 ? Secondary_Color : Primary_Color;
              setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
              }, i * Speed_Of_Animation);
            } 
            else {
              setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barOneValue = arrayBars[barOneIdx];
                barOneStyle.height = `${newHeight}px`;
                barOneValue.title = newHeight;
                
              }, i * Speed_Of_Animation);
            }
            Total_time = i;
            }
            this.setState({ array });
            this.SortingOver();
        }
    };

    bubbleSort = (array) => {
        if (this.state.sortingOver || initialSort) {
            initialSort = false;
            this.setState({ sortingOver: false });
            const animations = BubbleSortAnimation(array);
            const arrayBars = document.getElementsByClassName("array-bar");

            for (let i = 0; i < animations.length; i++) {
             const [
             barOneHeight,
             barOneIdx,
             barTwoHeight,
             barTwoIdx,
             barColor,
            ] = animations[i];

            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const barOneValue = arrayBars[barOneIdx];
            const barTwoValue = arrayBars[barTwoIdx];

            setTimeout(() => {
            barOneStyle.height = `${barOneHeight}px`;
            barTwoStyle.height = `${barTwoHeight}px`;
            barOneStyle.backgroundColor = barColor;
            barTwoStyle.backgroundColor = barColor;
            barOneValue.title = barOneHeight;
            barTwoValue.title = barTwoHeight;
            }, i * Speed_Of_Animation);
            Total_time = i;
            }
            this.setState({ array });
            this.SortingOver();
        }
    };
 
    selectionSort = (array) => {
        if (this.state.sortingOver || initialSort) {
            initialSort = false;
            this.setState({ sortingOver: false });
            const animations = SelectionSortAnimation(array);
            const arrayBars = document.getElementsByClassName("array-bar");
            
            var i = 0;
            for (i = 0; i < animations.length; i++) {
              const [
                barOneHeight,
                barOneIdx,
                barTwoHeight,
                barTwoIdx,
                barColor,
              ] = animations[i];
      
              const barOneStyle = arrayBars[barOneIdx].style;
              const barTwoStyle = arrayBars[barTwoIdx].style;
              const barOneValue = arrayBars[barOneIdx];
              const barTwoValue = arrayBars[barTwoIdx];
      
              //no swapping required only red color to be highlighted to search the minimum element
              if (barTwoHeight === 0) {
                setTimeout(() => {
                  barOneStyle.backgroundColor = barColor;
                }, i * Speed_Of_Animation);
              }
              //swap minimum element with left index
              else {
                setTimeout(() => {
                  barOneStyle.height = `${barOneHeight}px`;
                  barTwoStyle.height = `${barTwoHeight}px`;
                  barOneStyle.backgroundColor = barColor;
                  barTwoStyle.backgroundColor = barColor;
                  barOneValue.title = barOneHeight;
                  barTwoValue.title = barTwoHeight;
                }, i * Speed_Of_Animation);
              }
            }
            Total_time=i;
            this.setState({ array });
            this.SortingOver();
        }
    };

    quickSort = (array) => {
        if (this.state.sortingOver || initialSort) {
            initialSort = false;
            this.setState({ sortingOver: false });
            const animations = QuickSortAnimation(array);
            const arrayBars = document.getElementsByClassName("array-bar");
            
            var i = 0;
            for (i = 0; i < animations.length; i++) {
            const [
            barOneHeight,
            barOneIdx,
            barTwoHeight,
            barTwoIdx,
            barColor,
            ] = animations[i];

            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const barOneValue = arrayBars[barOneIdx];
            const barTwoValue = arrayBars[barTwoIdx];

            if (barTwoHeight === 0) {
             setTimeout(() => {
                barOneStyle.backgroundColor = barColor;
             }, i * Speed_Of_Animation);
            } 
            else {
                console.log(
                "barOne : ",
                barOneHeight,
                "barTwo : ",
                barTwoHeight,
                barColor
                );

                setTimeout(() => {
                    barOneStyle.height = `${barOneHeight}px`;
                    barTwoStyle.height = `${barTwoHeight}px`;
                    barOneStyle.backgroundColor = barColor;
                    barTwoStyle.backgroundColor = barColor;
                    barOneValue.title = barOneHeight;
                    barTwoValue.title = barTwoHeight;
                }, i * Speed_Of_Animation);
            }
            }

        Total_time = i;
        }
        this.setState({ array });
        this.SortingOver();
    };

        
      render() {
        return (
          <div>
            <Navbar
              mergeSort={this.mergeSort}
              bubbleSort={this.bubbleSort}
              selectionSort={this.selectionSort}
              quickSort={this.quickSort}
              sortingOver={this.state.sortingOver}
              initialSort={initialSort}
            />
          </div>
        ); //We pass the functions as props to the navbar class and use them using this.props
    }

}