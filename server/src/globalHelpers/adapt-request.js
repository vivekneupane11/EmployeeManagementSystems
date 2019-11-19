export default function adaptRequest(req = {}) {
    return Object.freeze({
        path: req.path,
        pathParam: req.params,
        pathQuery: req.query,
        method: req.method,
        data: req.body
    });

}