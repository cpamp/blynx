# express-webapi

Controllers and route decorators for express

## Example
```typescript
@Controller('api/test')
class TController {

    // GET /api/test
    @Route(HttpMethod.GET, '/')
    index(req: express.Request, res: express.Response) {
        res.send('Hello World');
    }

    // GET /api/test/v2
    @Route(HttpMethod.GET, '/v2')
    index2(req: express.Request, res: express.Response) {
        res.send('Hello World, v2');
    }
}

@Controller()
class TController2 {

    // GET /test
    @Route(HttpMethod.GET, 'test')
    index(req: express.Request, res: express.Response) {
        res.send(req.query);
    }
}

let app = express();
app.listen(3000, () => {
    console.log("listening...");

    // Register the app. Controllers and routes will not work without this!
    WebApi.start(app);
});
```