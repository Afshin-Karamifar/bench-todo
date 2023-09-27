import { z } from 'zod';

export const todoDataSchema = z.object({
  todo: z.string().nonempty("Todo must be provided."),
});

export const userSignInDataSchema = z.object({
  userName: z
    .string()
    .nonempty('Username must be provided.')
    .min(6, { message: 'Username must be at least 6 characters.' })
    .regex(new RegExp('.*^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$.*'), {
      message: 'Username must only contain Letters and Numbers.',
    }),
  password: z
    .string()
    .nonempty('Password must be provided.')
    .min(8, { message: 'Password must be at least 8 characters.' })
    .regex(new RegExp('.*[A-Z].*'), {
      message: 'Password must contain capital character.',
    })
    .regex(new RegExp('.*[a-z].*'), {
      message: 'Password must contain small character.',
    })
    .regex(new RegExp('.*[0-9].*'), {
      message: 'Password must contain number.',
    }),
});

export const userSignUpDataSchema = userSignInDataSchema
  .extend({
    confirmPassword: z
      .string()
      .nonempty("Confirm Password must be provided.")
      .min(8, { message: "Confirm Password must be at least 8 characters." })
      .regex(new RegExp(".*[A-Z].*"), {
        message: "Confirm Password must contain capital character.",
      })
      .regex(new RegExp(".*[a-z].*"), {
        message: "Confirm Password must contain small character.",
      })
      .regex(new RegExp(".*[0-9].*"), {
        message: "Confirm Password must contain number.",
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TTodo = z.infer<typeof todoDataSchema>;
export type TUserSignIn = z.infer<typeof userSignInDataSchema>;
export type TUserSignUp = z.infer<typeof userSignUpDataSchema>;
