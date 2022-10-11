import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const collectionDataDirectory = path.join(process.cwd(), 'collection-data')

export function getCollectionFile(fileName) {
	const filePath = path.join(collectionDataDirectory, fileName)
	const fileData = fs.readFileSync(filePath, 'utf-8')
	const { data, content } = matter(fileData)
	return { data, content }
}

export function getCollectionFiles() {
	const collectionFiles = fs.readdirSync(collectionDataDirectory, 'utf-8')

	const allFilesData = collectionFiles.map((collectionFile) => {
		return getCollectionFile(collectionFile)
	})

	return allFilesData
}

export function getCollectionData(slug) {
	const allData = getCollectionFiles()
	const target = allData.find(({ data }) => data.params === slug)

	return target
}
