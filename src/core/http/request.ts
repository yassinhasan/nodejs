
class Request 
{
    public req:any;
    public res:any;
    public handler: any;
    public setRequest(req: any)
    {
        this.req = req;
        return this;
    }
    public setReesponse(res: any)
    {
        this.res = res;
        return this;
    }

    public setHandler(handler:any)
    {
        this.handler = handler;
        return this;
    }

    public async execute()
    {
        return await this.handler( this.req , this.res);
    }

    // public input(key:any , defaultValue: any)
    // {
    //     return(
    //         this.req.query[key] ||
    //         this.req.params[key] ||
    //         this.req.body[key]?.value ||
    //         defaultValue

    //     )
    // }

  /**
   * Get the value of the given key from the request body, query or params
   */
  public input(key: string, defaultValue?: any) {
    return (
      this.req.params[key] ||
      this.req.body[key].value ||
      this.req.query[key] ||
      defaultValue
    );
  }


  public view(path:string)
  {
    path = path.replace(".","/");
    let file =  __dirname+"/../../resources/views/"+path+".html";
    console.log(file)
    const fs = require('fs');
    const stream = fs.createReadStream(file, 'utf8')
    this.res.header('Content-Type', 'text/html')
   return this.res.send(stream)   
  }
}

const request = new Request();
export default request;