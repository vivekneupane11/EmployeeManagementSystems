export default function imageuploadController({ database }) {
  return Object.freeze({
    addImage
  });

  async function addImage({ email, imagePath }) {
    const db = await database;
    await db.collection("users").updateOne(
      { email: email },
      {
        $set: { imagePath: imagePath }
      }
    );
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
}
