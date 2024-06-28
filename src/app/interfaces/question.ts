export interface Question {
    question: string,
    name: string,
    capital: string[],
    flag: string,
    options: string[],
    questionNumber: number,
    answer: string,
    yourAnswer: string | null,
    response: boolean,
}
