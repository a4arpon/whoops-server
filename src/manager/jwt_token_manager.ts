import dotenv from "dotenv";


dotenv.config()

export default class jwtTokenManager{
  private readonly secret: String
  private readonly expiresIn: String
  
  constructor (){
    this.secret= process.env.JWT_SECRET as string,
    this.expiresIn= '7d'
  }

  public createToken(id: string):string{
    
  }
}