export default function departmentController({ database }) {
  return Object.freeze({
    getDepartment,
    addDepartment,
    updateDepartment,
    removeDepartment
  });

  async function getDepartment({ id }) {
    const db = await database;
    const ID = await db.makeId(id);
    const query = id ? { _id: ID, deleted: false } : { deleted: false };
    return await db
      .collection("department")
      .find(query)
      .toArray();
  }
  async function addDepartment({ departmentName }) {
    const db = await database;
    const ifDepartmentExist = await db
      .collection("department")
      .findOne({ departmentName: departmentName });
    if (ifDepartmentExist) {
      throw "Department already exist";
    }
    await db
      .collection("department")
      .insertOne({ departmentName: departmentName, deleted: false });
    return "DepartmentName Added Sucessfully";
  }

  async function updateDepartment({ id, departmentName }) {
    const db = await database;
    const ID = await db.makeId(id);
    const ifDepartmentExist = await db
      .collection("department")
      .findOne({ departmentName: departmentName });
    console.log(Object.keys(ifDepartmentExist).length);
    if (ifDepartmentExist) {
      throw "Department already exist";
    }
    await db.collection("department").updateOne(
      { _id: ID },
      {
        $set: {
          departmentName: departmentName
        }
      }
    );
    return "Department Updated Successfully";
  }

  async function removeDepartment({ id }) {
    const db = await database;
    const ID = await db.makeId(id);
    await db.collection("department").updateOne(
      { _id: ID },
      {
        $set: {
          deleted: true
        }
      }
    );
    return "Data deleted successfully";
  }
}
