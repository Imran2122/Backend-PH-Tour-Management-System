import z from "zod";

 export const createUserZodSchema = z.object({
    name: z.string({
      invalid_type_error: "Name must be a string",
    })
      .min(2, { message: "Name too short. Minimum 2 characters required." })
      .max(50, { message: "Name too long. Maximum 50 characters allowed." }),

    email: z.string({
      invalid_type_error: "Email must be a string",
    }).email({ message: "Invalid email address" }),

    password: z.string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/(?=.*[A-Z])/, { message: "Must contain an uppercase letter" })
      .regex(/(?=.*\d)/, { message: "Must contain a digit" })
      .regex(/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, { message: "Must contain a special character" }),

    phone: z.string({invalid_type_error:"Phone number must be string"})
    .regex(/^01[3-9]\d{8}$/, {
      message: "Invalid Bangladeshi phone number (e.g. 017xxxxxxxx)",})
      .optional(),

    address: z.string({
      invalid_type_error: "Address must be a string",
    })
      .max(200, { message: "Address cannot exceed 200 characters" })
      .optional()

    })