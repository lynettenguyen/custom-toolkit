// File name: mytoolkit.js

import {SVG} from './svg.min.js';


var MyToolkit = (function() {
    var draw = SVG().addTo('body').size("100%", "100%");

    /**
        * Creates the button widget
        * @constructor
    */
    var Button = function(){
        var buttonGroup = draw.group();
        var rect = buttonGroup.rect(100,50).fill('#a9c5a0').radius(10);
        var text = buttonGroup.text("");
        var clickEvent = null;
        var stateTracker = false;

        rect.mouseover(function(){
            this.fill({ color: '#c6dec6'})
        })
        rect.mouseout(function(){
            this.fill({ color: '#a9c5a0'})
        })
        rect.mouseup(function(){
            this.fill({ color: '#a9c5a0'})
        })
        rect.click(function(event){
            console.log("Button is clicked")
            this.fill({ color: '#758173'})
            if(clickEvent != null)
                clickEvent(event)
        })
        return {
            /**
             * Moves the button widget
             * @method
             * @param {int} x - x coordinate of the button
             * @param {int} y - y coordinate of the button
            */
            move: function(x, y) {
                rect.move(x, y);
            },

            /**
             * Stores the event handler
             * @method
             * @param {event} eventHandler - the event handler
            */
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },

            /**
             * Adds text to a button 
             * @method
             * @param {string} textLabel - the label of the button 
            */
            label: function(textLabel){
                var length = textLabel.length;
                var offset = 50 - (Math.floor(length / 2) * 7);
                text = buttonGroup.text(textLabel);
                text.move(50-offset, 25);
                text.fill({color: "white"})
            }

        }
    }

    /**
        * Creates a checkbox widget
        * @constructor
     */
    var Checkbox = function(){
        var checkboxGroup = draw.group();
        var rect = checkboxGroup.rect(25,25).fill('white').stroke({width: 2, color: "#a9c5a0"});
        var text = checkboxGroup.text("hey");
        text.move(30,4);
        var clicked = false; 
        var check = checkboxGroup.text("x").fill({color: "white"}).size(8);

        var clickEvent = null;

        checkboxGroup.click(function(event){
            if (!clicked){
                check.fill({color:"black"});
                clicked = true;
            }
            else{
                check.fill({color:"white"});
                clicked = false;
            }

            if (clickEvent != null){
                clickEvent(event)
            }
        })

        return {
            /**
             * Moves the checkbox widget
             * @method
             * @param {int} x - x coordinate of the button
             * @param {int} y - y coordinate of the button
            */
            move: function(x, y) {
                checkboxGroup.move(x,y);
            },

            /**
             * Set the text to the right of the checkbox 
             * @method
             * @param {string} textLabel - the text to the right of the checkbox
            */
            label: function(textLabel){
                text.text(textLabel);
                // text.move(30,4);
            },

            /**
             * Set the event handler for on click events
             * @method
             * @param {event} event - the event handler
            */
            onclick: function(event){
                clickEvent = event;
            },

            /**
             * Returns the current state of the checkbox
             * @method
            */
            checkState: function(){
                return clicked;
            }
            
        }
    }

    /**
        * Creates a Radio Button widget
        * @constructor
        * @param {int} number - the amount of radio buttons 
     */
    var RadioButton = function(number){
        var radiobuttonGroup = draw.group();
        var x_cord = 0;
        var y_cord = 0;
        var buttons = [];
        var selectedIndex = null;
        var monitorState = false;
        var clickEvent = null;

        if (number <2 ){
            number = 2;
        }

        var i;
        for (i = 0; i < number; ++i){
            var option = radiobuttonGroup.ellipse(25,25);
            var select = radiobuttonGroup.ellipse(15, 15).fill({color: '#a9c5a0'});
            option.fill('#a9c5a0');
            console.log("this is i: " + i)
            if (i == 0){
                console.log("inside i ==0 loop")
                console.log(x_cord + " "+ y_cord);
                option.move(x_cord, y_cord);
                console.log(x_cord + " "+ y_cord);
                select.move(x_cord+5, y_cord+5);
            }
            else{
                console.log("inside else loop")
                option.move(x_cord, y_cord +(i*25) + (i*8));
                select.move(x_cord+5, y_cord+(i*25) + (i*8) + 5);
            }
            select.mouseover(function(event){
                if (monitorState){
                    console.log(event);
                    console.log("STATE: IDLE");
                }
                
            });

            select.mouseup(function(event){
                if (monitorState){
                    console.log(event);
                    console.log("STATE: EXECUTED");
                }
            })

            select.click(function(event){
                if (monitorState){
                    console.log("STATE: PRESSED");
                }
            
                if(selectedIndex != null){
                    var currentIndex = 0;
                    var i;
                    for (i = 0; i < number; i++){
                        if (event.y > y_cord + ((i+1)*25) + ((i+1)*8) +5){
                            currentIndex++;
                        }
                    }

                    if (currentIndex == selectedIndex){
                        this.fill({color: '#a9c5a0'});
                        selectedIndex = null;
                    }
                    
                    else{
                        buttons[selectedIndex-1].fill({color: '#a9c5a0'});
                        buttons[currentIndex-1].fill("white");
                        selectedIndex = currentIndex;
                    }
                }
                else {
                    var currentIndex = 0;
                    var i;
                    for (i = 0; i < number; i++){
                        if (event.y > (y_cord + ((i+1)*25) + ((i+1)*8) + 5)){
                            console.log("button is selected for the first time")
                            console.log(y_cord + ((i+1)*25) + ((i+1)*8) + 5)
                            currentIndex++;
                        }
                    }
                    this.fill({ color: 'white'})
                    selectedIndex = currentIndex;
                }

                if (clickEvent != null){
                    clickEvent(event);
                }
            })
            buttons.push(select);

        }

        return {
            /**
             * Moves the radio button widget
             * @method
             * @param {int} x - x coordinate of the button
             * @param {int} y - y coordinate of the button
            */
            move: function(x, y){
                radiobuttonGroup.move(x,y);
                x_cord = x;
                y_cord = y;
            },

            /**
             * Adds a text label to a specified radio button
             * @method
             * @param {int} index - the index of the specified radio button
             * @param {string} textLabel - label of the radio button
            */
            label: function(index, textLabel){
                var text = radiobuttonGroup.text(textLabel);

                if (index == 0){
                    text.move(x_cord+32, y_cord +2);
                }
                else {
                    text.move(x_cord+32, y_cord +(index*25)+10);
                }
            },
            
            monitor: function(){
                monitorState = !monitorState;
            },

            /**
             * Set the event handler for on click events
             * @method
             * @param {event} event - the event handler
            */
            onclick: function(e){
                clickEvent = e;
            },

            /**
             * Returns which button is selected
             * @method
            */
            selected: function(){
                if (selectedIndex != null){
                    return selectedIndex-1;
                }
                else{
                    return null;
                } 
            }


        }
    }

    /**
        * Creates a Textbox widget
        * @constructor
     */
    var Textbox = function(){
        var x_caret = 5;
        var y_caret = 5;
        var box_x = 0;
        var box_y = 0;
        var textBoxGroup = draw.group();
        var box = textBoxGroup.rect(200, 30).fill("white").radius(5).stroke({width: 2, color: "#a9c5a0"});
        var caret = textBoxGroup.line(x_caret, 2.5, y_caret, 25).stroke({width: 1, color: "white"});
        var text = "";
        var textLabel = textBoxGroup.text(text);
        
        var clicked = false;
        var clickEvent = null;

        box.mouseover(function(){
            caret.stroke({width: 1, color: "black"})
        })
        box.mouseout(function(){
            caret.stroke({width: 1, color: "white"})
        })

        box.click(function(event){
            if (clicked){
                clicked = false;
            }
            else{
                clicked = true;
            }
            if (clickEvent != null){
                clickEvent(event);
            }
        })

        SVG.on(document, "click", function(e){

            if ((e.y < box_y || e.y > box_y +30) && (e.x < box_x || e.x > box_x +200) && clicked){
                console.log("document is clicked after box is clicked");
                clicked = false;
            }
        })

        SVG.on(document, "keydown", function(e){
            if (clicked){
                if (e.key === "Backspace"){
                    text = text.substring(0, text.length-1);
                }
                else{
                    text += e.key;
                }

                textLabel.text(text);
                var caretSpace = 7 + (text.length*6);
                caret.move(caretSpace +box_x, box_y+ 2.5, caretSpace+box_x, box_y+25);
            }

            if (clickEvent != null){
                clickEvent(e);
            }
        })

        return {
            /**
             * Moves the textbox widget
             * @method
             * @param {int} x - x coordinate of the button
             * @param {int} y - y coordinate of the button
            */
            move: function(x, y){
                box_x = x;
                box_y =y;
                textBoxGroup.move(x,y);
            },

            /**
             * Returns the text inside the textbox
             * @method
             * @param {int} x - x coordinate of the button
             * @param {int} y - y coordinate of the button
            */
            getText: function(){
                return text;
            },

            /**
             * Set the event handler for on keydown events
             * @method
             * @param {event} event - the event handler
            */
            onkeydown: function(eventHandler){
                clickEvent = eventHandler
            }
        }

    }

    /**
        * Creates a scroll bar widget
        * @constructor
        * @param {int} height - the height of the scroll bar
     */
    var ScrollBar = function(height){

        var ScrollBarGroup = draw.group();
        
        var x_cord = 0;
        var y_cord = 0;
        var barHeight = height;

        var bar = ScrollBarGroup.rect(10, height).radius(5).fill('#a9c5a0')
        var scroll = ScrollBarGroup.rect(6, height/5).radius(3).fill("white");
        scroll.move(2, 3);

        var y_scroll = 3;

        var direction = null;
        var start_scroll;
        var end_scroll;
        var clickEvent = null;

        ScrollBarGroup.mouseout(function(){
            scroll.fill("white");
        })

        ScrollBarGroup.mouseover(function(){
            scroll.fill("#c6dec6");
        })

        SVG.on(scroll, "mousedown", function(event){
            start_scroll = event.y;
            scroll.fill("#758173");
        })

        SVG.on(ScrollBarGroup, "mouseup", function(event){
            end_scroll = event.y;
            
            if (end_scroll > start_scroll){
                direction = "down";
                var change = end_scroll-start_scroll;
                y_scroll += change;
                console.log(y_scroll);

                if ((y_cord + y_scroll) > y_cord + barHeight){
                    scroll.move(x_cord+ 2, y_cord + y_scroll -3);
                }
                else{
                    scroll.move(x_cord+ 2, y_cord + y_scroll);
                }

            }

            else {
                direction = "up";
                var change = start_scroll -end_scroll;
                y_scroll -= change;
                console.log(y_scroll);

                if ((y_cord + y_scroll) < y_cord + 3){
                    scroll.move(x_cord+ 2, y_cord + 3);
                }
                else{
                    scroll.move(x_cord+ 2, y_cord + y_scroll);
                }
                
            }

            if (clickEvent != null){
                clickEvent(event);
            }
        })

        return {
            /**
             * Moves the scroll bar widget
             * @method
             * @param {int} x - x coordinate of the button
             * @param {int} y - y coordinate of the button
            */
            move: function(x,y){
                x_cord = x;
                y_cord = y;

                ScrollBarGroup.move(x,y);

            },

            /**
             * Returns the position of the scroll bar widget
             * @method
            */
            getPosition: function(){
                return y_cord + y_scroll;
            },

            /**
             * Returns the direction of the scroll bar widget
             * @method
            */
            getDirection: function(){
                return direction;
            },

            /**
             * Set the event handler for on click events
             * @method
             * @param {event} event - the event handler
            */
            onclick: function(event){
                clickEvent = event;
            },

            /**
             * Changes the height of the scroll bar
             * @method
             * @param {int} newHeight - the new height of scroll bar
            */
            changeHeight: function(newHeight){
                bar.attr({height: newHeight});
                scroll.attr({height: newHeight/5});
                barHeight = newHeight;
            }
        }
    }

    /**
        * Creates a progress bar widget
        * @constructor
        * @param {int} width - the width of the progress bar
     */
    var ProgressBar = function(width){
        var ProgressBarGroup = draw.group();
        var bar = ProgressBarGroup.rect(width, 10).radius(5).fill('#a9c5a0')
        var progress = ProgressBarGroup.rect(0, 8).radius(3).fill("white");
        progress.move(2.5, 2.5);
        

        var progressValue = 0;
        var width = width;
        var clickEvent = null;

        var update = function(){
            var change = progressValue/100
            console.log(change)
            progress.attr({width: width*change, height: 5});
        }

        ProgressBarGroup.click(function(event){
            if (clickEvent != null){
                clickEvent(event)
            }

            progress.fill("#758173")
        })

        ProgressBarGroup.mouseout(function(){
            progress.fill("white");
        })

        ProgressBarGroup.mouseover(function(){
            progress.fill("#c6dec6");
        })

        return {
            /**
             * Moves the progress bar widget
             * @method
             * @param {int} x - x coordinate of the button
             * @param {int} y - y coordinate of the button
            */
            move: function(x, y){
                ProgressBarGroup.move(x,y);
            },

            /**
             * Sets the value progress bar widget
             * @method
             * @param {int} value - the value to set the bar to (0-100)
            */
            setValue: function(value){
                progressValue = value;
                console.log(progressValue);
                update();
            },

            /**
             * Returns the value of the progress bar 
             * @method
            */
            getValue: function(){
                return progressValue;
            },

            /**
             * Increments the progress with specified value 
             * @method
             * @param {int} value - the value to increment (0-100)
            */
            incrementValue: function(value){
                progressValue += value;
                if (progressValue > 100){
                    progressValue = 97.5;
                }
            },

            /**
             * Set the event handler for on click events
             * @method
             * @param {event} event - the event handler
            */
            onclick: function(event){
                clickEvent = event;
            },

            /**
             * Change the width of the progress bar
             * @method
             * @param {int} width - new width of progress bar
            */
            changeWidth: function(newWidth){
                bar.attr({width: newWidth});
                progress.attr({width: newWidth*(progressValue/100)});
                width = newWidth;
            }
        }
    }

    /**
        * Creates a Counter widget
        * @constructor
        * @param {int} width - the width of the progress bar
     */
    var Counter = function(){
        var counterGroup = draw.group();

        var box = counterGroup.rect(125, 30).fill("white").radius(5).stroke({width: 2, color: "#a9c5a0"});

        var minusGroup = draw.group()
        var minus = minusGroup.rect(30, 20).fill("#a9c5a0").radius(5);
        var minusLine = minusGroup.line(12.5, 15, 26.5, 15).stroke({width: 3, color: "white"})
        minus.move(5, 5);
        minusGroup.addTo(counterGroup);

        var plusGroup = draw.group();
        var plus = plusGroup.rect(30, 20).fill("#a9c5a0").radius(5);
        var plusLine1 = plusGroup.line(97.5, 15, 111.5, 15).stroke({width: 3, color: "white"})
        var plusline2 = plusGroup.line(104.5, 8, 104.5, 22).stroke({width: 3, color: "white"})
        plus.move(90, 5);
        plusGroup.addTo(counterGroup);

        var counter = 0;
        var counterText = counterGroup.text(counter.toLocaleString());
        counterText.move(60, 6);

        plusGroup.click(function(){
            plus.fill("#758173")
            counter++;
            counterText.text(counter.toLocaleString());
        })

        plusGroup.mouseover(function(){
            plus.fill("#c6dec6");
        })

        plusGroup.mouseout(function(){
            plus.fill("#a9c5a0");
        })

        minusGroup.click(function(){
            minus.fill("#758173");
            counter--;
            counterText.text(counter.toLocaleString());
        })

        minusGroup.mouseover(function(){
            minus.fill("#c6dec6");
        })

        minusGroup.mouseout(function(){
            minus.fill("#a9c5a0");
        })
        
        return {
            /**
             * Moves the counter widget
             * @method
             * @param {int} x - x coordinate of the button
             * @
            */
            move: function(x,y){
                counterGroup.move(x,y);
            },

            /**
             * Returns counter value
             * @method
            */
            getValue: function(){
                return counter;
            }
        }
    }
return {Button, Checkbox, RadioButton, Textbox, ScrollBar, ProgressBar, Counter}
}());

export{MyToolkit}