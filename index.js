const fs = require("fs");
const http = require("http");

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}


function writeJsonFile(path, jsonObj) {
    return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(jsonObj, null, 2), (err) => {
        if (err) reject(err); // -> to .catch
        else resolve(jsonObj); // -> to .then
    });
    });
}

function parseRequestBody(request) {
    return new Promise((resolve, reject) => {
      // collect body in an array
    let requestBodyChunks = [];
    request
        .on("data", (chunk) => requestBodyChunks.push(chunk))
        .on("end", () => {
        const body = JSON.parse(Buffer.concat(requestBodyChunks).toString());
        resolve(body);
        })
        .on("error", (error) => reject(error));
    });
}

const server = http.createServer(function serverBrainAkaRequestHandler(
    request,
    response
) {
    console.log("New Request:", request.method, request.url);

    if (request.url === "/api/index" && request.method === "GET") {
    console.log("doing API stuff");
    readFile("./gaestebuch-eintrag.json")
        .then((jsonString) => response.end(jsonString))
        .catch((err) => {
        console.log(err);
        const INTERNAL_SERVER_ERROR = 500;
        const error = { success: false, error: "Could not retrieve entries" };
        const errorJsonString = JSON.stringify(error);
        response.writeHead(INTERNAL_SERVER_ERROR).end(errorJsonString);
        });
    } else if (request.url === "/api/index" && request.method === "POST") {
    const serviceArrayPromise = readFile("./gaestebuch-eintrag.json").then(
        (jsonBuffer) => JSON.parse(jsonBuffer.toString())
);
    const bodyPromise = parseRequestBody(request);

    Promise.all([serviceArrayPromise, bodyPromise])
        .then(([servicesArray, body]) => [...servicesArray, body])
        .then((newSerivcesArray) =>
        writeJsonFile("./gaestebuch-eintrag.json", newSerivcesArray)
        )
        .then((newSerivcesArray) =>
        response.end(JSON.stringify(newSerivcesArray))
        );
    } else {
    console.log("doing file server stuff");
      // FILE SERVER
      // interpret request url as path --> file-server logic

      // request.url soll matchen mit meinem lokalen Pfad (auf dem Server), zB:
      // /pages/index.html
      // /images/...
      // /css/...
    const filePath =
        request.url === "/"
        ? "./public/pages/index.html"
        : "./public" + request.url; // der punkt ist da um aus der route/url einen RELATIVEN pfad zu erzeugen ./pages/index.html
    readFile(filePath)
        .then((text) => response.end(text))
        .catch((err) => {
        console.log(err);
        response.writeHead(301, { Location: `/pages/error.html` }).end();
        });
    }
});

const PORT = 4000;
server.listen(PORT, () => console.log("Server ready at port: " + PORT));