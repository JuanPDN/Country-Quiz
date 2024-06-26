const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

const randomCountries = (maxNum: number, minNum: number): number => {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

const gerateTypeQuestion = (): number => {
    return Math.floor(Math.random() * 3) + 1
}

const generateQuestion = (TypeQuestion: number, data: any): string => {
    const question: { [key: number]: string } = {
        1: `Which country is ${data.capital} the capital of?`,
        2: `Which country does this flag ${data.flag} belong to?`,
        3: `Which city is the capital of ${data.name.common}?`
    }
    return question[TypeQuestion]
}

const genrateAnswer = (typeQuestion: number, item: any) => {
    return typeQuestion !== 3 ? item.name.common : item.capital.toString();
}

const generateOptions = (item: any, data: any, typeQuestion: number): any[] => {
    const options = [typeQuestion !== 3 ? item.name.common : item.capital.toString()];
    while (options.length < 4) {
        let randomIndex = randomCountries(data.length, 1);
        let element = data[randomIndex];
        if (element && !options.includes(data[randomIndex])) {
            if (typeQuestion !== 3) {
                options.push(data[randomIndex].name.common);
            } else {
                options.push(data[randomIndex].capital.toString());
            }
        }
    }
    return shuffle(options)
}

const selectQuestion = (data: any): any[] => {
    const questions = []
    for (let i = 0; i < 10; i++) {
        let randomIndex = randomCountries(data.length, 1);
        const element = data[randomIndex];
        if (element) {
            questions.push(element);
        }
    }
    return questions
}

export const generateQuestions = (data: any): any => {
    if (data) {
        const filterData = data.filter((item: any) => item.capital !== undefined && item.name.common !== undefined)
        const response = filterData.map((item: any) => {
            const typeQuestion = gerateTypeQuestion()
            const options = generateOptions(item, filterData, typeQuestion)
            const question = generateQuestion(typeQuestion, item);
            const answer = genrateAnswer(typeQuestion, item)

            return {
                question: question,
                name: item.name.common,
                capital: item.capital,
                flag: item.flag,
                options: options,
                questionNumber: typeQuestion,
                answer: answer,
                yourAnswer: null,
                response: false,
            }
        })
        return selectQuestion(response)
    }
}