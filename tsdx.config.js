module.exports = {
	rollup(config, options) {
		const { localDev } = options;

		if (localDev) {
			config.output.file = config.output.file.replace('dist', `example/${options.name}`);
			return config
		}

		return config;
	}
};