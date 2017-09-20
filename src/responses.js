const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getResponse = (request, response, acceptedTypes, tempData) => {
  const responseData = {
    message: tempData.message,
    id: tempData.id,
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${responseData.id}</id>`;
    responseXML = `${responseXML} <message>${responseData.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml');
  }

  const jsonString = JSON.stringify(responseData);

  return respond(request, response, jsonString, 'application/json');
};

const getResponseData = (url) => {
  const data = {
    message: 'hey',
    id: 'yo',
  };

  switch (url) {
    case '/success':
      data.message = 'This is a successful response';
      data.id = 'Success';
      break;
    case '/badRequest':
      data.message = 'missing valid query params. Needs to be true.';
      data.id = 'badRequest';
      break;
    case '/unauthorized':
      data.message = 'Missing loggedIn query parameter set to yes';
      data.id = 'unauthorized';
      break;
    case '/forbidden':
      data.message = 'You do not have access to this content';
      data.id = 'forbidden';
      break;
    case '/internalError':
      data.message = 'Internal Server Error. Something went wrong';
      data.id = 'internalError';
      break;
    case '/notImplemented':
      data.message = 'A get request for this page has not been implemented yet. Check again later for updated content';
      data.id = 'notImplemented';
      break;
    default:
      data.message = 'The page you are looking for was not found';
      data.id = 'notFound';
      break;
  }

  return data;
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const getCSS = (request, response) => {
  respond(request, response, css, 'text/css');
};

const success = (request, response, acceptedTypes) => {
  getResponse(request, response, acceptedTypes, getResponseData('/success'));
};

const badRequest = (request, response, acceptedTypes) => {
  getResponse(request, response, acceptedTypes, getResponseData('/badRequest'));
};

const notFound = (request, response, acceptedTypes) => {
  getResponse(request, response, acceptedTypes, getResponseData('/notFound'));
};

const unauthorized = (request, response, acceptedTypes) => {
  getResponse(request, response, acceptedTypes, getResponseData('/unauthorized'));
};

const forbidden = (request, response, acceptedTypes) => {
  getResponse(request, response, acceptedTypes, getResponseData('/forbidden'));
};

const internalError = (request, response, acceptedTypes) => {
  getResponse(request, response, acceptedTypes, getResponseData('/internalError'));
};

const notImplemented = (request, response, acceptedTypes) => {
  getResponse(request, response, acceptedTypes, getResponseData('/notImplemented'));
};

module.exports = {
  getResponse,
  getIndex,
  getCSS,
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internalError,
  notImplemented,
};
