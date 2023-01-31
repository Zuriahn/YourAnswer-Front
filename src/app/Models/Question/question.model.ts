import { AnswerVM } from "../Answer/answer.model";
import { CategoryVM } from "../Category/category.model";
import { UserVM } from "../User/user.model";

export class QuestionVM{
    public id: number;
    public title: string;
    public description: string;
    public image: string;
    public date: string;
    public status: string;
    public userid: number;
    public user: UserVM;
    public categoryid: number;
    public category: CategoryVM;
    public answers: AnswerVM[];
}