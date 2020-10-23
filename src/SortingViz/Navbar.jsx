import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


const No_Of_Array_Bars = 44; 
const Primary_Color = 'turquoise';
var height_of_window= window.innerHeight;
 
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.PushRandomNumber();
    }

    PushRandomNumber = () => {
        if (
          this.props.sortingOver === true || this.props.initialSort === true) 
          {
          const array = [];
          for (let i = 0; i < No_Of_Array_Bars ; i++) {
           array.push(this.randomNoFromInterval(6,  height_of_window - 90));
          }
          
          let bars = document.getElementsByClassName("array-bar");
          //change color to blue
          for (let i = 0; i < bars.length; i++)
            bars[i].style.backgroundColor = Primary_Color;
    
          this.setState({ array });
        }
      };
      
    randomNoFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }  

    doMerge = (e) => {
        this.props.mergeSort(this.state.array);
      };

    doBubble = (e) => {
        this.props.bubbleSort(this.state.array)
    };

    doSelection = (e) => {
        this.props.selectionSort(this.state.array)
    };

    doQuick = (e) => {
        this.props.quickSort(this.state.array)
    };


    render() {
        const { array } = this.state;
        return (
          <div className="parent">
              <nav className="navbar navbar-dark bg-dark">
              <div className="navbar-header">
                  
                  <Button
                    className="btn btn-outline-light btn-secondary navbar-btn"
                    key={this.props.sortingOver}
                    onClick={this.PushRandomNumber}
                  >
                    Generate New Array
                  </Button>
                </div>
    
                <div className="btn-group" role="group" aria-label="Basic example">
                  
                  <Button
                     title="O(NLog(N)) Average Time Complexity"
                    className="btn btn-outline-info btn-dark"
                    onClick={() => this.doMerge()}
                  >
                    Merge Sort
                  </Button>
          

                  <Button
                    title="O(N^2) Average Time Complexity"
                    className="btn btn-outline-info btn-dark"
                    onClick={() => this.doBubble()}
                  >
                    Bubble Sort
                  </Button>
    
                  <Button
                    title="O(N^2) Average Time Complexity"
                    className="btn btn-outline-info btn-dark"
                    onClick={() => this.doSelection()}
                  >
                    Selection Sort
                  </Button>
    
                  <Button
                    title="O(NLog(N)) Average Time Complexity"
                    className="btn btn-outline-info btn-dark"
                    onClick={() => this.doQuick()}
                  >
                    Quick Sort
                  </Button>
                </div>
            </nav>
    
            <div className="array-container">
                {array.map((value, index) => (
                <div className="array-bar"
                     title={value} 
                     key={index}
                     style={{
                         backgroundColor: Primary_Color,
                         height: `${value}px`,
                    }}>
                      
                </div>
              )
            )}
            </div>
        </div>
        );
    }

}

export default Navbar;