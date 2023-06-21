export type question = {
    id: string,
    content: string,
    isMultipleChoice: boolean,
    answers?: string[],
}

export type fullQuestion = {
    correctAnswer: number
} & question

export type quiz = {
    id: string,
    deadNames: string[]
    deadLastName: string
    chosenNames: string[]
    chosenLastName: string
    nickname: string

    // TODO: order stuff/drop question ????

    redirect: string
}

export type preview = {
    question: question,
    title: string
}

export type AnyInputEvent = MouseEvent | KeyboardEvent

export function shouldContinueEvent(e: AnyInputEvent): boolean {
    if ((e as KeyboardEvent).key) {
        if (["Enter", "Space"].includes((e as KeyboardEvent).key)) {
            e.preventDefault()
            return true
        }
        return false
    }
    e.preventDefault()
    return true
}

export const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));