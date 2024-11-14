export const preFlight = (req, res,next) => {
    res.header("Access-Control-Allow-Origin", process.env.PRE_FLIGHT); // restrict it to the required domain
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    // Set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    return next();
}