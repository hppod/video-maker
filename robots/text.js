const algorithmia = require('algorithmia')
const algorithmiaKey = require('./../credentials/apiKey.json').apiKey

async function robot(content) {
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    // breakContentIntoSentences(content)

    async function fetchContentFromWikipedia(content) {
        const algorithmiaAuthenticated = algorithmia(algorithmiaKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaResponse.get()

        content.sourceContentOriginal = wikipediaContent.content
    }

    function sanitizeContent(content) {
        const withoutBlankLines = removeBlankLines(content.sourceContentOriginal)
        console.log(withoutBlankLines)

        function removeBlankLines(text) {
            const allLines = text.split('\n')

            const withoutBlankLines = allLines.filter((line) => {
                if (line.trim().length === 0) {
                    return false
                }

                return true
            })

            return withoutBlankLines
        }
    }
}

module.exports = robot