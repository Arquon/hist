import { type PartialRecord } from "@/types/PartialRecord";
import {
   isCapitalSymbolMethod,
   isDigitSymbolMethod,
   isEmailMethod,
   isLatinaAndNumericMethod,
   isMaxLengthMethod,
   isMinLengthMethod,
   isRequiredMethod,
   type IValidationMethod,
} from "@/types/validationTypes";
import { isObjectWithLength, isString } from "./typeChecking";
import { emailRegex, isCapitalSymbolRegex, isDigitSymbolRegex, latinaAndNumericRegex } from "./regex";
import { type ValidationErrors } from "@/types/errorsTypes";

export type TValidator<T> = PartialRecord<keyof T, Partial<IValidationMethod>>;

function validator<T extends object>(data: T, validatorConfig: TValidator<T>): ValidationErrors<T> {
   const errors: ValidationErrors<T> = {};

   for (const key of Object.keys(validatorConfig) as Array<keyof T>) {
      const validationField = validatorConfig[key];
      if (validationField === undefined) continue;
      const error = validate(data[key], validationField);
      if (error !== null) {
         errors[key] = error;
      }
   }

   return errors;
}

function validate(value: unknown, method: Partial<IValidationMethod>): string | null {
   if (isRequiredMethod(method)) {
      const { isRequired } = method;
      if (value === "" || value === null || value === undefined) {
         return isRequired.message;
      }
   }
   if (isLatinaAndNumericMethod(method)) {
      const { latinaAndNumeric } = method;
      if (!isString(value)) {
         throw new Error("Ошибка типа");
      }
      if (!latinaAndNumericRegex.test(value)) {
         return latinaAndNumeric.message;
      }
   }
   if (isMinLengthMethod(method)) {
      const { minLength } = method;
      if (!isString(value) && !isObjectWithLength(value)) {
         throw new Error("Ошибка типа");
      }
      if (value.length < minLength.min) {
         return minLength.message;
      }
   }
   if (isMaxLengthMethod(method)) {
      const { maxLength } = method;
      if (!isString(value) && !isObjectWithLength(value)) {
         throw new Error("Ошибка типа");
      }
      if (value.length > maxLength.max) {
         return maxLength.message;
      }
   }
   if (isCapitalSymbolMethod(method)) {
      const { isCapitalSymbol } = method;
      if (!isString(value)) {
         throw new Error("Ошибка типа");
      }
      if (!isCapitalSymbolRegex.test(value)) {
         return isCapitalSymbol.message;
      }
   }
   if (isDigitSymbolMethod(method)) {
      const { isDigitSymbol } = method;
      if (!isString(value)) {
         throw new Error("Ошибка типа");
      }
      if (!isDigitSymbolRegex.test(value)) {
         return isDigitSymbol.message;
      }
   }
   if (isEmailMethod(method)) {
      const { email } = method;
      if (!isString(value)) {
         throw new Error("Ошибка типа");
      }
      if (!emailRegex.test(value)) {
         return email.message;
      }
   }

   return null;
}

export default validator;
