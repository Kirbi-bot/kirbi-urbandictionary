const urban = require('urban');

module.exports = Kirbi => {
	return {
		commands: [
			'urban'
		],
		urban: {
			usage: '<word>',
			description: 'looks up a word on Urban Dictionary',
			process: (msg, suffix, isEdit, cb) => {
				const targetWord = suffix === '' ? urban.random() : urban(suffix);
				targetWord.first(json => {
					let title = `Urban Dictionary: ${suffix}`;
					let message;
					let example;

					if (json) {
						title = `Urban Dictionary: ${json.word}`;
						message = `${json.definition}`;
						if (json.example) {
							example = `Example: ${json.example}`;
						}
					} else {
						message = 'No matches found';
					}

					cb({
						embed: {
							color: Kirbi.Config.discord.defaultEmbedColor,
							title,
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
