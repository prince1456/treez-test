import * as request from 'supertest';
// new request()
import app from '../src/index'

export function post(url: string, body: object) {
    const httpRequest = request(app).post(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json')
    httpRequest.set('Origin', 'http://localhost:3000')
    return httpRequest;
  }
  export function deleteRequest(url: string) {
    const httpRequest = request(app).delete(url);
    httpRequest.set('Accept', 'application/json')
    httpRequest.set('Origin', 'http://localhost:3000')
    return httpRequest;
  }
  export function putRequest(url: string, body: object) {
    const httpRequest = request(app).put(url)
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json')
    httpRequest.set('Origin', 'http://localhost:3000')
    return httpRequest;
  }
  export function getRequest(url: string) {
    const httpRequest = request(app).get(url);
    httpRequest.set('Accept', 'application/json')
    httpRequest.set('Origin', 'http://localhost:3000')
    return httpRequest;
  }