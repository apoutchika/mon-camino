import * as yup from 'yup';

export const contactSchema = yup.object({
  name: yup
    .string()
    .required('Votre nom est requis')
    .min(2, 'Votre nom doit contenir au moins 2 caractères')
    .max(100, 'Votre nom est un peu long, non ?'),
  email: yup
    .string()
    .required('Votre email est requis')
    .email('Cette adresse email ne semble pas valide'),
  subject: yup
    .string()
    .required('Merci de choisir un sujet')
    .min(3, 'Le sujet doit contenir au moins 3 caractères')
    .max(100, 'Le sujet est trop long'),
  message: yup
    .string()
    .required('Un petit message serait sympa')
    .min(10, 'Votre message est un peu court (minimum 10 caractères)')
    .max(2000, 'Votre message est trop long (maximum 2000 caractères)'),
  recaptcha: yup
    .string()
    .required('Merci de confirmer que vous n\'êtes pas un robot'),
});

export type ContactFormData = yup.InferType<typeof contactSchema>;
