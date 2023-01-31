import { QuestionVM } from "../Question/question.model";

export class CategoryVM{
    public id: number;
    public name: string;
    public description: string;
    public questions: QuestionVM[];
}