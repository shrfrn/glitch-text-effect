'use strict'

const MAX_ITERATION_COUNT = 12

function onLoad() {
	const elTxt = document.querySelector('h1')
	const strHtmls = elTxt.innerText.split('').map(char => `<span>${char}</span>`)
	elTxt.innerHTML = strHtmls.join('')

    const prms = flicker()
    Promise.all(prms)
        .then(() => onLoad())
}

function flicker() {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+!@#$%^&*()_+!@#$%^&*()_+'
	const elSpans = document.querySelectorAll('span')

	return Array.from(elSpans).map(elSpan => {
		const originalChar = elSpan.innerText
        if(originalChar === ' ') return

		const randChar = chars.at(getRandomInt(0, chars.length - 1))
		const glitchStart = getRandomInt(0, 30000)

        return new Promise(resolve => {
            setTimeout(() => { 
                const maxIterationCount = getRandomInt(2, MAX_ITERATION_COUNT)
                var iterationCount = 0
    
                const interval = setInterval(() => {
                    elSpan.innerText = elSpan.innerText === originalChar ? randChar : originalChar
                    if(++iterationCount === maxIterationCount) {
                        clearInterval(interval)
                        elSpan.innerText = originalChar
                        resolve()
                    }
                }, 75)
            }, glitchStart)
        })
    })
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
