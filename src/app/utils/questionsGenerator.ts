import { Country } from "../interfaces/country";
import { Question } from "../interfaces/question";

const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

const randomCountries = (maxNum: number, minNum: number): number => {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

const generateTypeQuestion = (): number => {
    return Math.floor(Math.random() * 3) + 1
}

const generateQuestion = (TypeQuestion: number, data: Country): string => {
    const question: { [key: number]: string } = {
        1: `Which country is ${data.capital} the capital of?`,
        2: `Which country does this flag ${data.flag} belong to?`,
        3: `Which city is the capital of ${data.name.common}?`
    }
    return question[TypeQuestion]
}

const generateAnswer = (typeQuestion: number, item: Country): string => {
    return typeQuestion !== 3 ? item.name.common : item.capital?.toString() || '';
}

const generateOptions = (item: any, countries: any, typeQuestion: number): string[] => {
    const options = [generateAnswer(typeQuestion, item)];
    while (options.length < 4) {
        const randomIndex = randomCountries(countries.length, 1);
        const country = countries[randomIndex];
        if (country && !options.includes(country)) {
            typeQuestion !== 3 ? options.push(country.name.common)
                : options.push(country.capital.toString());
        }
    }
    return shuffle(options)
}

const selectQuestion = (data: Question[]): Question[] => {
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

export const generateQuestions = (data: Country[]): Question[] => {
    if (data) {
        const filterData = data.filter((item: Country) => item.capital !== undefined && item.name.common !== undefined);
        const response = filterData.map((item: Country) => {
            const typeQuestion = generateTypeQuestion();
            const options = generateOptions(item, filterData, typeQuestion);
            const question = generateQuestion(typeQuestion, item);
            const answer = generateAnswer(typeQuestion, item);

            return {
                question,
                name: item.name.common,
                capital: item.capital!,
                flag: item.flag,
                options,
                questionNumber: typeQuestion,
                answer,
                yourAnswer: null,
                response: false,
            };
        });
        return selectQuestion(response);
    }
    return [];
}

