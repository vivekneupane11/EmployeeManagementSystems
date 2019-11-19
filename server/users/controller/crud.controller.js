const bcrypt = require("bcrypt");
const ObjectID = require("mongodb").ObjectID;
async function getallUsers(req, res) {
  try {
    const USERS = req.db.collection("users");
    const result = await USERS.find({}).toArray();
    //  const imagesdata = await req.db.collection('images').findOne({email:})

    res.status(201).json({
      data: result,
      success: true
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

async function deleteUsers(req, res) {
  try {
    let myquery = { _id: ObjectID(req.body._id) };
    let newvalues = { $set: { deleted: true } };
    await req.db
      .collection("users")
      .updateOne(myquery, newvalues, { upsert: true }, function(error) {
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

async function updateUsers(req, res) {
  try {
    //     BCRYPT PASSWORD BEFORE
    //     const salt = await bcrypt.genSalt(10);
    //     req.body.password = await bcrypt.hash(req.body.password, salt);

    let myquery = { _id: ObjectID(req.body._id) };

    let newvalues = {
      $set: {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        age: req.body.age,
        contact: req.body.contact,
        role: req.body.role,
        department: req.body.department,
        dob: req.body.dob
        //password: req.body.password
      }
    };

    await req.db
      .collection("users")
      .updateOne(myquery, newvalues, function(err) {
        if (err) throw err;

        res.send("updated");
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

module.exports = {
  getallUsers: getallUsers,
  deleteUsers: deleteUsers,
  updateUsers: updateUsers
};
