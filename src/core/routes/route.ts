import { routeType } from "./routeType";
import request from "./../http/request"

class Route 
{
    private routes:routeType [] = [];
    static instance: any;
    private constructor(){};

    static getInstance()
    {
        if(Route.instance == null)
        {
            Route.instance = new Route();
        }
        return Route.instance;
    }

    public get(path:string , handler: any)
    {
        
        this.routes.push({
            method: "get" ,
            path : path ,
            handler :handler
        });
        return this;
    }
    public post(path:string , handler: any)
    {
        
        this.routes.push({
            method: "post" ,
            path : path ,
            handler :handler
        });
        return this;
    }

    public scan(server:any)
    {
        this.routes.forEach((route)=>
        {
            const method = route.method.toLowerCase(); // get
            const requestFunction = server[method].bind(server);

             requestFunction(route.path, this.executeHandler(route));
        })
    }

    public executeHandler(route: any)
    {
        return async (req:any , resp:any)=>
        {
            request.setRequest(req).setReesponse(resp).setHandler(route.handler);
            
            return await request.execute();

        }
    }
}

const route = Route.getInstance();
export default route;