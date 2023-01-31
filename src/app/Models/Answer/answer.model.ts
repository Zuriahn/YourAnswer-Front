import { CommentaryVM } from "../Commentary/commentary.model";
import { QuestionVM } from "../Question/question.model";
import { UserVM } from "../User/user.model";

export class AnswerVM{
    public id: number;
    public description: string;
    public date: string;
    public status: boolean;
    public userid: number;
    public user: UserVM;
    public questionid: number;
    public question: QuestionVM;
    public comments: CommentaryVM[];
}