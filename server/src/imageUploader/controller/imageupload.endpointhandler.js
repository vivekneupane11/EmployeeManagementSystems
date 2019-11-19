export default function imageendpointHandler({ imageuploadcontroller }) {
  return async function({ imagePath, httpMethods }) {
    switch (httpMethods.method) {
      case "POST":
        return postforImageUpload({ imagePath, httpMethods });
    }
  };

  async function postforImageUpload({ imagePath, httpMethods }) {
    const { email } = httpMethods.data;
    return await imageuploadcontroller.addImage({ email, imagePath });
  }
}
