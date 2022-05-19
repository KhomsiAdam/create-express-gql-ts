import type { Request, Response } from 'express';
import { dataloader } from '@middlewares/loader';

export interface Context {
  req: Request;
  res: Response;
  dataloader: typeof dataloader;
}

export const context = async ({ req, res }: { req: Request; res: Response }): Promise<Context> => ({
  req,
  res,
  dataloader,
});
