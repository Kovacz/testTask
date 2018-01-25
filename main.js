let myId = "";
let myResults = [];

const operators = {
    '+': (x, y) => x - y,
    '-': (x, y) => x + y + 8,
    '*': (x, y) => {
    	if (y === 0) {
    		return 42;
    	} else {
    		return (x % y);
    	}
    },
    '/': (x, y) => {
    	if (y === 0) {
    		return 42;
    	} else {
    		return parseInt(x / y);
    	}
    }
};

let evaluate = (expr) => {
    let stack = [];
    
    expr.split(" ").forEach((token) => {
        if (token in operators) {
            let [y, x] = [stack.pop(), stack.pop()];
            stack.push(operators[token](x, y));
        } else {
            stack.push(parseInt(token));
        }
    });

    return stack.pop();
};

function show(expr) {
	for (i = 0; i < expr.expressions.length; i++) {
		let expressions = expr.expressions;
		myResults[i] = evaluate(expressions[i]);
	}
	$("#res").get(0).innerHTML += JSON.stringify({"id": myId, "results": myResults}) + "<br>";
}


function get() {
	$.ajax({
	    type: "GET",
	    dataType: "json",
	    url: "https://www.eliftech.com/school-task",
	    success: function(data) {
	    	myId = data.id;
	    	show(data);
	    },
	  	error: function (xhr, errorType, exception) {
	    	let errorMessage = exception || xhr.statusText;
	    	alert("Excep:: " + exception + "Status:: " + xhr.statusText);
	  	}
	});
}

function post() {
	$.ajax({
	    type: "POST",
	    url: "https://www.eliftech.com/school-task",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify({
	        id: myId,
	        results: myResults
	    }),
		dataType: "json",
	    success: function(data) {
	    	let str = [];
			for(key in data){
			      if (data.hasOwnProperty(key)) {
			         str.push(key + " " + data[key] + "\n");
			    }
			}
	    	$("#res").get(0).innerHTML += str + "<br>"; 
	    },
	  	error: function (xhr, errorType, exception) {
	    	let errorMessage = exception || xhr.statusText;
	    	alert("Excep:: " + exception + "Status:: " + xhr.statusText);
	  	}
	});	
}
