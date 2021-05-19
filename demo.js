import {MyToolkit} from './mytoolkit.js';

var btn = new MyToolkit.Button;
btn.move(10,10);
btn.onclick(function(e){
	console.log(e);
});

btn.label("my button");
btn.monitor();

var box = new MyToolkit.Checkbox;
box.move(10,70);
box.label("Finish assignment");
box.onclick(function(e){
	console.log(e);
	if (box.checkState()){
		console.log("Box is checked");
	}
	else{
		console.log("Box is unchecked");
	}
})
box.monitor();

var radio = new MyToolkit.RadioButton(3);
radio.move(10, 110)
radio.label(0, "Option #1");
radio.label(1, "Option #2");
radio.label(2, "Option #3")
radio.onclick(function(e){
	console.log(e);
	console.log("button selected is: " + radio.selected());
})
radio.monitor()

var textbox = new MyToolkit.Textbox;
textbox.move(10,220);

textbox.onkeydown(function(e){
	console.log(e);
	console.log("text has changed")
	console.log("the current text is: " + textbox.getText())
})

textbox.monitor();

var scrollbar = new MyToolkit.ScrollBar(50);
scrollbar.changeHeight(100);
scrollbar.move(300, 10);
scrollbar.onclick(function(e){
	console.log(e);
	console.log("Positon of scroll is: " + scrollbar.getPosition());
	console.log("Direction of scroll is: " + scrollbar.getDirection());
})
scrollbar.monitor();

var progressBar = new MyToolkit.ProgressBar(100);
progressBar.changeWidth(200);
progressBar.move(300, 140);
progressBar.setValue(50);

progressBar.onclick(function(e){
	console.log(e);
	console.log("The value of the progress bar is: " + progressBar.getValue() + "%");
})

var counter = new MyToolkit.Counter();
counter.move(300, 180);