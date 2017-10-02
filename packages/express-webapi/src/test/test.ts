import * as express from "express";
import { Controller } from "../controller.decorator";
import { Route } from "../route.decorator";
import { HttpMethod } from "../httpMethod";
import { WebApi } from "../webApi";

@Controller()
class TController {
    @Route(HttpMethod.GET, '/')
    index(req: express.Request, res: express.Response) {
        res.send('Hello World')
    }
}

@Controller()
class TController2 {
    @Route(HttpMethod.GET, '/test')
    index(req: express.Request, res: express.Response) {
        res.send(req.query);
    }
}

let app = express();
app.listen(3000, () => {
    console.log("listening...");
    WebApi.start(app);
});