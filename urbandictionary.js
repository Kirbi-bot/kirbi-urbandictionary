const urban = require('urban');

module.exports = function (config, auth) {
	return {
		commands: [
			'urban'
		],
		urban: {
			usage: '<word>',
			description: "looks up a word on Urban Dictionary",
			process: (msg, suffix, isEdit, cb) => {
				var targetWord = suffix == "" ? urban.random() : urban(suffix);
				targetWord.first(function (json) {
					var title = `Urban Dictionary: ${suffix}`;
					var message;
					var example;
		
					if (json) {
						title = `Urban Dictionary: ${json.word}`
						message = `${json.definition}`;
						if (json.example) {
							example = `Example: ${json.example}`;
						}
		
					} else {
						message = 'No matches found';
					}
		
					cb({
						embed: {
							color: config.discord.defaultEmbedColor,
							title: title,
							description: message,
							footer: {
								text: example
							}
						}
					}, msg);
				});
			}
		}
	};
};
