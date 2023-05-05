type validatorRules = "isRequired";

interface IValidatorMethod {
   message: string;
}

export type TValidator<T> = Record<keyof T, Record<validatorRules, IValidatorMethod>>;

export type TErrors<T> = Record<keyof T, string>;

function validator<T extends object>(data: T, validatorConfig: TValidator<T>): Partial<TErrors<T>> {
   const errors: Partial<TErrors<T>> = {};
   console.log({ data, validatorConfig });

   for (const key of Object.keys(data) as Array<keyof T>) {
      if (!(key in validatorConfig)) continue;
      for (const validatorKey of Object.keys(validatorConfig[key]) as validatorRules[]) {
         console.log({ key, validatorKey, value: data[key] });
         if (errors[key] !== undefined) continue;
         const error = validate(data[key], validatorKey, validatorConfig[key][validatorKey]);
         console.log({ error });
         if (error !== null) {
            errors[key] = error;
         }
      }
   }

   return errors;
}

function validate(value: any, rule: validatorRules, config: IValidatorMethod): string | null {
   let error: string | null = null;
   switch (rule) {
      case "isRequired":
         if (value === "") {
            error = config.message;
         }
   }

   return error;
}

export default validator;
