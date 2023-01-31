import { AnswerVM } from "../Answer/answer.model";
import { QuestionVM } from "../Question/question.model";

export class UserVM{
    public id: number;
    public username: string;
    public name: string;
    public email: string;
    public password: string;
    public image: string;
    public date: string;
    public status: boolean;
    public questions: QuestionVM[];
    public answers: AnswerVM[];
}