import makeDb from '../db';
import usersController from './controller/users.controller';
import usersEndpointHandler from '../users/controller/endpoints.controller';
const database = makeDb();
const userscontroller = usersController({ database });
const usersendpointHandler = usersEndpointHandler({ userscontroller });
export default usersendpointHandler;