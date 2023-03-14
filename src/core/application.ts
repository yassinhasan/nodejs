import { fastify } from "fastify";
import route from "./routes/route";
import  request  from "./http/request";
import fs from "fs"


const server = require('fastify')()
const qs = require('qs')
server.register(require('@fastify/formbody'), { parser: (str: any) => qs.parse(str) })

route.get("/",(req:any,reply:any)=>
{                                                                                  
      return   request.view("home.index")
})

route.post("/create",(req:any,reply:any)=>
{                                                                                  
      const email = request.input("email","empty")
      return {
        email
      }
})
async function  startApplication()
{
    route.scan(server);
     try {
           const address = await server.listen({port: 6000});
           console.log(`Start browsing using ${address}`);
    } catch (error) {
           console.log(error) 
    }

}

export  default startApplication;