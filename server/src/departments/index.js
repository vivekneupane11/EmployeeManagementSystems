import makeDb from '../db';
import departmentController from '../departments/controller/dept.controller';
import departmentEndpointHandler from '../departments/controller/dept.EndpointHandler';

const database = makeDb();
const departmentcontroller = departmentController({ database });
const departmentendpointhandler = departmentEndpointHandler({ departmentcontroller });

export default departmentendpointhandler;