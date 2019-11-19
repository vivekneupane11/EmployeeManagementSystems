import express from 'express';

const departmentroutes = express.Router();
//Local packages
import adaptRequest from '../../globalHelpers/adapt-request';
import endpointHandler from '../../departments';
departmentroutes.all('/departments', departmentController);
departmentroutes.get('/departments/:id', departmentController);


function departmentController(req, res) {
    const httpMethods = adaptRequest(req);
    endpointHandler({ httpMethods }).then(({ header, statusCode, data }) => {
        res.set(header).status(statusCode).send(data);
    }).catch(error => {
        res.set({ 'Content-Type': 'application/json' }).status(500).send({
            success: false,
            error
        });
    });

}


module.exports = departmentroutes;