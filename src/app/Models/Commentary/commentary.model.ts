import { AnswerVM } from "../Answer/answer.model";
import { UserVM } from "../User/user.model";

export class CommentaryVM{
    public id: number;
    public description: string;
    public date: string;
    public status: boolean;
    public userid: number;
    public user: UserVM;
    public answerid: number;
    public answer: AnswerVM;
}