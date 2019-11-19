import validateUserInfo from "../userhelper/validateUser";

export default function usersController({ database }) {
  return Object.freeze({
    getUsers,
    addUsers,
    updateUsers,
    removeUsers
  });

  async function getUsers({ id }) {
    const db = await database;
    const ID = await db.makeId(id);
    const query = id ? { _id: ID, deleted: false } : { deleted: false };
    return await db
      .collection("users")
      .find(query)
      .toArray();
  }

  async function addUsers({ validuserInfo, imagePath }) {
    const db = await database;
    const ifEmailExist = await db
      .collection("users")
      .findOne({ email: validuserInfo.email });
    if (ifEmailExist) {
      throw "Email already exist";
    }
    let date = (await Date.now()) + 3600 * 1000 * 24;
    await db.collection("users").insertOne({
      username: validuserInfo.username,
      email: validuserInfo.email,
      password: validuserInfo.password,
      department: validuserInfo.department,
      role: validuserInfo.role,
      imagePath: imagePath,
      token: validuserInfo.token,
      tokenExpiryDate: date,
      created_at: await Date.now(),
      deleted: false
    });
    console.log(validuserInfo);
    return validuserInfo;
  }

  async function removeUsers({ id }) {
    const db = await database;
    const ID = await db.makeId(id);
    try {
      await db
        .collection("users")
        .updateOne({ _id: ID }, { $set: { deleted: true } });
    } catch (err) {
      throw err;
    }
    return "Deleted successfully";
  }

  async function updateUsers({
    id,
    email,
    password,
    department,
    role,
    username,
    contact,
    address,
    dob,
    age
  }) {
    const db = await database;
    const ID = await db.makeId(id);
    await db.collection("users").updateOne(
      { _id: ID },
      {
        $set: {
          username: username,
          department: department,
          role: role,
          contact: contact,
          dob: dob,
          address: address,
          age: age,
          updated_at: Date.now(),
          deleted: false
        }
      }
    );
    return "Updated successfully";
  }
}
