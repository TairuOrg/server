export const nameRegExp = new RegExp(/^[^0-9*/+.\?\\[\]{}><!~|¡=¿@#$%^&()_`:;"]+$/) 
export const idRegExp = new RegExp(/^[^a-zA-Z*/+.\?\\'[\]{}><!~|¡=¿@#$%^&()_`:;"-]+$/)
export const phoneRegExp = new RegExp(/^[^a-zA-Z*/+.\?\\'[\]{}><!~|¡=¿@#$%^&()_`:;"-]+$/)
export const emailRegExp = new RegExp(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/);