const validation = require('../helper/validation.controller')
var ObjectID = require('mongodb').ObjectID;

async function createDepartment(req, res, next) {

    try {

        //validate
        const { error } = validation.joivalidatedepartment(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);


        const department = await req.db.collection('department').findOne({ name: req.body.name });
        if (department) return res.status(400).send("Department ALREADY REGISTERED");

        await req.db.collection('department').insertOne(req.body, (err, result) => {
            if (err) res.json(error, 304);
            console.log("Department has just been registered" + result.insertedCount);
            res.send("Department has been registered");
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: {
                error: err,
                success: false

            }
        });
    }
}
async function getallDepartment(req, res, next) {


    try {
        const DEPARTMENT = req.db.collection('department');
        await DEPARTMENT.find({}).toArray(function(error, result) {
            res.status(200).json({
                data: result

            });

        });
    } catch (error) {
        error.statusCode = 500; //INtrenal server error

        return next(error);
    }

}

async function deleteDepartment(req, res, next) {

    try {
        const DEPARTMENT = req.db.collection('department');
        let myquery = { _id: ObjectID(req.params.id) };
        await DEPARTMENT.deleteOne(myquery, { upsert: true }, (error, obj) => {
            if (error) {
                error.statusCode = 204;
                return res.status(204).json({
                    status: 204,
                    message: "Data not deleted",
                    success: false
                });
            }
        });
        res.status(200).json({
            status: 200,
            message: "Data deleted successfully"

        });
    } catch (error) {
        error.statusCode = 500; //INtrenal server error

        return next(error);
    }
}

async function updateDepartment(req, res, next) {

    try {
        const DEPARTMENT = req.db.collection('department');


        let myquery = { _id: ObjectID(req.params.id) };
        let newvalues = { $set: { name: req.body.name , depthead: req.body.depthead} };
        await DEPARTMENT.updateOne(myquery, newvalues, { upsert: true }, function(error, result) {
            if (error) throw error;
            return res.status(200).json({
                status: 200,
                detail: {
                    message: "Updated successfully",
                    success: true
                }
            });
        });




    } catch (error) {
        error.statusCode = 500; //INtrenal server error
        error.message = "Internal Server error catched";
        return next(error);
    }
}


module.exports = {
    getallDepartment: getallDepartment,
    deleteDepartment: deleteDepartment,
    updateDepartment: updateDepartment,
    createDepartment: createDepartment
}
