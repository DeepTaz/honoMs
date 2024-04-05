import {z} from "zod"

export const userSchema = z.object({
    //email: z.string().email({message: "Email invalide."}),
    //password: z.string(),
    //confirmPassword: z.string(),
    //pseudo: z.string().min(4, "Doit être composé de 4 caractères ou plus").trim(),
    //phoneNumber: z.string().regex(REGEX_OBJECT.TG_NUM_REGEX, "Numéro invalide"),
    //gender: z.nativeEnum({m: "m", f: "f"})
}).superRefine(({confirmPassword, password}, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Les mots de passe ne correspondes pas.",
            path: ["password", "confirmPassword"]
        });
    }
})


export const imageSchema = z.object({
    name: z.string().max(20, "Le nom ne doit pas dépasser 20 caractères").trim()

})