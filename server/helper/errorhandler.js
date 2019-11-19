module.exports = (error, req, res, next) => {

    switch (error.statusCode) {
        case 412:
            res.status(412).json({
                status: 412,
                message: {
                    error: error.details[0].message,
                    success: false
                }

            });
            break;
        case 405:
            res.status(405).json({
                status: 405,
                message: {
                    error: error.message,
                    success: false
                }

            });
            break;
        case 401:
            res.status(401).json({
                status: 401,
                message: {
                    error: error,
                    success: false
                }

            });
            break;

        case 404:
            res.status(404).json({
                status:404,
                message:{
                    error:error.message,
                    success=false
                }
            });
            break;
            
        case 204:
            res.status(204).json({
                status: 204,
                message: {
                    error: error.message,
                    success: false
                }

            });
            break;
        case 500:
            res.status(500).json({
                status: 500,
                message: {
                    error: error.message,
                    success: false
                }
            });
            break;
    }

    // res.send("From app" + error + error.status);

}