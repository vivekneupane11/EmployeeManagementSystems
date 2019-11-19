export default function documentuploadController({ database }) {
  return Object.freeze({
    addDocument,
    getDocument
  });

  async function addDocument({
    email,
    documentPath,
    title,
    description,
    docType,
    author,
    visibility,
    userID
  }) {
    const db = await database;
    await db.collection("documents").insertOne({
      email: email,
      title: title,
      description: description,
      visibility: visibility,
      docType: docType,
      author: author,
      userID: userID,
      documentPath: documentPath
    });
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: {
        success: true,
        content: "Updated Successfully"
      }
    };
  }
  async function getDocument({ id, role }) {
    const db = await database;
    let query;

    if (role === "true") {
      query = { docType: "organization", visibility: "true" };
    } else if (role === "false") {
      query = { docType: "organization" };
    } else {
      query = id ? { userID: id } : { docType: "organization" };
    }

    const data = await db
      .collection("documents")
      .find(query)
      .toArray();
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: {
        success: true,
        content: JSON.stringify(data)
      }
    };
  }
}
