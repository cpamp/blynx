# express-webapi

Controllers and route decorators for express

## Example
```typescript
@Controller('api/test')
class TController {

    // GET /api/test
    @Route('/')
    index(req: express.Request, res: express.Response) {
        res.send('Hello World');
    }

    // POST /api/test/v2
    @Route('/v2', HttpMethod.POST)
    index2(_req: express.Request, res: express.Response) {
        res.send('Hello World, v2');
    }

    // GET /api/test/v3
    @Get
    @Route('/v3')
    index3(_req: express.Request, res: express.Response) {
        res.send('Hello World, v3')
    }

    // POST /api/test/v4
    @Post
    @Route('/v4')
    index4(_req: express.Request, res: express.Response) {
        res.send('Hello World, v4')
    }

    // PUT /api/test/v5
    @Route('/v5')
    @Put
    index5(_req: express.Request, res: express.Response) {
        res.send('Hello World, v5')
    }
}

@Controller()
class TController2 {

    // GET /test
    @Route('test', HttpMethod.GET)
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