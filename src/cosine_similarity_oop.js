var CosineSimilarity = require('./CosineSimilarity.js'),
argv = require('argv'),
fs = require('fs');

var args = argv.option({

    name: 'message',
    short: 'm',
    type: 'string',
    description: 'Defines the message to query',
    example: "'script --message=value' or 'script -m value'"

}).run().options;

if (typeof args.message !== 'undefined') {

	var input = args.message;

	fs.readFile('data/all_combined.json', function(err, data){
		

		if (err) throw err;
		var corpus = JSON.parse(data);
	
		var cosignSimilarity = new CosineSimilarity(corpus);
		var scoredCorpus = cosignSimilarity.findSimilar(input, {
			onlyScore: [{
				from: "^804",
				date: "^2012-03-20",
				to: "Me"
			},
			{
				from: "Me",
				date: "^2012-03-20",
				to: "^804"
			}],
			// dontScore: {
				
			// },
			// preference: [
			// 	{
			// 		to: "8049215907",
			// 		modifier: -.1
			// 	},
			// 	{
			// 		from: "Me",
			// 		modifier: .1
			// 	}
			// ],
			limit: 10,
			minScore: .01
		});
		
		for(var i = 0; i < scoredCorpus.length; i++){
			console.log('score: ' + scoredCorpus[i].score);
			console.log('date: ' + scoredCorpus[i].date);
			console.log('to: ' + scoredCorpus[i].to);
			console.log('from: ' + scoredCorpus[i].from);
			console.log('message: ' + scoredCorpus[i].text);
			console.log();
		}
		
	});

} else {

	console.log('Please include a --message or -m value');
	process.exit();
}
