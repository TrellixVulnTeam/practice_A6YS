if (window.Worker) {
	var myWorker = new Worker('worker.js');
	var message = {addThis: {num1:1, num2:2}};

	myWorker.postMessage(message)

	myWorker.onmessage = function(e) {
		console.dir(e.data.result);
	};
}