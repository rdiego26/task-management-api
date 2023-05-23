import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { UserEntity } from '../entities/user.entity';
import { createUser, getUsers, getUser, ICreateUserPayload } from '../repositories/user.repository';
@Route('users')
@Tags('User')
export default class UserController {
	@Get('/')
	public async getUsers(): Promise<Array<UserEntity>> {
		return getUsers();
	}

	@Get('/:id')
	public async getUser(@Path() id: string): Promise<UserEntity | null> {
		return getUser(id);
	}

	@Post('/')
	public async createUser(@Body() body: ICreateUserPayload): Promise<UserEntity> {
		return createUser(body);
	}
}
