// Validaciones para el registro (Expresiones Regulares)

// Usuario: letras, números, guiones bajos. Mínimo 3 caracteres.
export const regexUser = /^[a-zA-Z0-9_]{3,}$/;

// Contraseña: Mínimo 8 caracteres, al menos 1 mayúscula y 1 minúscula.
export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// Teléfono: Exactamente 9 dígitos numéricos.
export const regexPhone = /^\d{9}$/;

// Código Postal: Exactamente 5 dígitos.
export const regexPostalCode = /^\d{5}$/;

// Edad: Números entre 18 y 99.
export const regexAge = /^(1[8-9]|[2-9]\d)$/;