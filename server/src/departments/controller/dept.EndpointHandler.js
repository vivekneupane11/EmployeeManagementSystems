import makehttpError from "../../globalHelpers/http-error";
export default function departmentEndpointHandler({ departmentcontroller }) {
  return async function({ httpMethods }) {
    switch (httpMethods.method) {
      case "GET":
        return getDepartment({ httpMethods });
      case "POST":
        return postDepartment({ httpMethods });
      case "PUT":
        return putDepartment({ httpMethods });
      case "DELETE":
        return deleteDepartment({ httpMethods });
    }
  };

  async function getDepartment({ httpMethods }) {
    const { id } = httpMethods.pathParam;
    const data = await departmentcontroller.getDepartment({ id });
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: {
        success: true,
        content: data
      }
    };
  }

  async function postDepartment({ httpMethods }) {
    const { departmentName } = httpMethods.data;
    if (!departmentName) {
      return makehttpError({
        statusCode: 401,
        errorMessage: "Departmentname is Invalid"
      });
    }

    const data = await departmentcontroller.addDepartment({ departmentName });
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: {
        success: true,
        content: data
      }
    };
  }

  async function putDepartment({ httpMethods }) {
    const { id } = httpMethods.pathQuery;
    const { departmentName } = httpMethods.data;
    if (!id || !departmentName) {
      return makehttpError({
        statusCode: 401,
        errorMessage: "No Id or data found"
      });
    }
    const data = await departmentcontroller.updateDepartment({
      id,
      departmentName
    });
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: {
        success: true,
        content: data
      }
    };
  }

  async function deleteDepartment({ httpMethods }) {
    const { id } = httpMethods.pathQuery;
    if (!id) {
      return makehttpError({
        statusCode: 400,
        errorMessage: "No pathQuery Id found"
      });
    }
    const data = await departmentcontroller.removeDepartment({ id });
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: {
        success: true,
        content: data
      }
    };
  }
}
