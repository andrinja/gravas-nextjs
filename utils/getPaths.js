export function getPaths(source, prefix, key = 'title') {
	return source.map( ritual => {
		const path = `${prefix}/${ritual[key].split('_').join('-')}`
		return [
			`/${path}`,
			`/en/${path}`,
			`/ru/${path}`
		]
	}).flat()
}