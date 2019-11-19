import makeDb from '../db';
import imageuploadController from './controller/imageupload.controller';
import imageendpointHandler from './controller/imageupload.endpointhandler';

const database = makeDb();
const imageuploadcontroller = imageuploadController({ database });
const imageendpointhandler = imageendpointHandler({ imageuploadcontroller });

export default imageendpointhandler;