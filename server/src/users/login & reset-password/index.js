import makeDb from '../../db';
import loginController from './controller/loginController';
import loginEndPointHandler from './controller/loginEndpointHandler';
const database = makeDb();
const logincontroller = loginController({ database });
const loginendpointhandler = loginEndPointHandler({ logincontroller });
export default loginendpointhandler;