import makeDb from '../db';
import documentuploadController from './controller/documentupload.controller';
import documentendpointHandler from './controller/documentupload.endpointhandler';

const database = makeDb();
const documentuploadcontroller = documentuploadController({ database });
const documentendpointhandler = documentendpointHandler({ documentuploadcontroller });

export default documentendpointhandler;