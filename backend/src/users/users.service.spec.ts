import { User, UserDocument } from './schemas/users.schema';
import { UsersService } from './users.service';
import { Model } from 'mongoose'

describe('UsersService', () => {
    let usersService = new UsersService(User as Model<UserDocument>);

    describe('isPrivate', () => {

        it('should be true if isPrivate is true', async () => {
            const input = { isPrivate: true } as UserDocument;

            const res = await usersService.isPrivate(input);

            expect(res).toBe(true);
        });

        it('should be false if isPrivate is false', async () => {
            const input = { isPrivate: false } as UserDocument;

            const res = await usersService.isPrivate(input);

            expect(res).toBe(false);
        });

        it('should throw Error if user is not valid (does not exist)', async () => {
            const input = undefined;
            try {
                await usersService.isPrivate(input);
                fail();
            } catch (e) {
                expect(e.message).toBe('User not found');
            }
        });

    });

    describe('validateUser', () => {

        it('should be true if user.sessionId eq sessionId with Bearer', async () => {
            const userInput = { sessionId: 'someIdWithNumb3r5==!/' } as UserDocument;
            const sessionIdInput = 'Bearer someIdWithNumb3r5==!/';

            const res = await usersService.validateUser(userInput, sessionIdInput);

            expect(res).toBe(true);
        });

        it('should be false if user.sessionId neq sessionId with Bearer', async () => {
            const userInput = { sessionId: 'someIdWithNumb3r5==!/' } as UserDocument;
            const sessionIdInput = 'Bearer someIdWithNumb3r5==!/.';

            const res = await usersService.validateUser(userInput, sessionIdInput);

            expect(res).toBe(false);
        });

        it('should be false if user.sessionId eq sessionId without Bearer', async () => {
            const userInput = { sessionId: 'someIdWithNumb3r5==!/' } as UserDocument;
            const sessionIdInput = 'someIdWithNumb3r5==!/';

            const res = await usersService.validateUser(userInput, sessionIdInput);

            expect(res).toBe(false);
        });

    });

});