export default function imageendpointHandler({ documentuploadcontroller }) {
  return async function({ documentPath, httpMethods }) {
    switch (httpMethods.method) {
      case "POST":
        return postforDocumentUpload({ documentPath, httpMethods });
      case "GET":
        return getforDocumentUpload({ httpMethods });
    }
  };

  async function postforDocumentUpload({ documentPath, httpMethods }) {
    const docInfo = httpMethods.data;

    return await documentuploadcontroller.addDocument({
      documentPath,
      ...docInfo
    });
  }

  async function getforDocumentUpload({ httpMethods }) {
    const { id } = httpMethods.pathParam;
    const { role } = httpMethods.pathQuery;
    return await documentuploadcontroller.getDocument({ id, role });
  }
}
