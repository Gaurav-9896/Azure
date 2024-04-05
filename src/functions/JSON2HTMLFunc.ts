import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import {jsonToHtml} from '@contentstack/json-rte-serializer';

export async function JSON2HTMLFunc(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    let prsedjson;
    const json = await request.text();
    try {
         prsedjson =JSON.parse(json);
    } 
    catch (e) 
    {
        context.log('The JSON is invalid', json);
        return {
            status: 400,
            body: 'The JSON is invalid',
        };
    }
    const html = jsonToHtml(prsedjson);
    return {
        body: html,
        headers: { 'Content-Type': 'text/html' },
    };
};

app.http('JSON2HTMLFunc', {
    methods: ['GET','POST'],
    authLevel: 'anonymous',
    handler: JSON2HTMLFunc
});
