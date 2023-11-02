import IUserProps from "./user";

export default interface IBlogProps extends Document {
	title: string;
	summary: string;
	text: string;
	picture?: string;
	author: IUserProps;
	_id: string;
}
