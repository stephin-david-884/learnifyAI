// // interfaces/http/controllers/AuthController.ts
// import { Request, Response } from "express";
// import { RegisterUser } from "../../../application/use-cases/auth/RegisterUser.auth";

// export class AuthController {
//   constructor(private registerUserUseCase: RegisterUser) {}

//   async register(req: Request, res: Response) {
//     try {
//       const user = await this.registerUserUseCase.execute(req.body);
//       res.status(201).json({
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         subscriptionPlan: user.subscriptionPlan,
//         credits: user.credits,
//       });
//     } catch (err: any) {
//       res.status(400).json({ message: err.message });
//     }
//   }
// }