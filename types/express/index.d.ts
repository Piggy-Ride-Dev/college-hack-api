declare namespace Express {
  export interface Request {
    isAuthenticated(): boolean;
  }
  export interface Request<Params extends ParamsDictionary = ParamsDictionary> {
    user?: any;
  }
}
