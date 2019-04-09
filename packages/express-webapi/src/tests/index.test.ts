import * as express from "express";
import { Controller } from "../controller";
import { Route } from "../route";
import { HttpMethod } from "../httpMethod";
import { WebApi } from "../webApi";
// @ts-ignore
import { Get, Put, Post, Delete, Patch} from "../methods";

@Controller('api/test')
// @ts-ignore Ignore unused
class TController { 
    @Route('/')
    index(_req: express.Request, res: express.Response) {
        res.send('Hello World');
    }

    @Route('/v2', HttpMethod.POST)
    index2(_req: express.Request, res: express.Response) {
        res.send('Hello World, v2');
    }

    @Get
    @Route('/v3')
    index3(_req: express.Request, res: express.Response) {
        res.send('Hello World, v3')
    }

    @Post
    @Route('/v4')
    index4(_req: express.Request, res: express.Response) {
        res.send('Hello World, v4')
    }

    @Route('/v5')
    @Put
    index5(_req: express.Request, res: express.Response) {
        res.send('Hello World, v5')
    }
}

@Controller()
// @ts-ignore Ignore unused
class TController2 { 
    @Route('test')
    index(req: express.Request, res: express.Response) {
        res.send(req.query);
    }
}

let app = express();
app.listen(3000, () => {
    console.log("listening...");
    WebApi.start(app);
});