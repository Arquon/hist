interface SampleConfig {
   message: string;
}

interface RequiredConfig extends SampleConfig {}

interface RequiredMethod {
   isRequired: RequiredConfig;
}

interface LatinaAndNumericConfig extends SampleConfig {}

interface LatinaAndNumericMethod {
   latinaAndNumeric: LatinaAndNumericConfig;
}

interface MinLengthConfig extends SampleConfig {
   min: number;
}

interface MinLengthMethod {
   minLength: MinLengthConfig;
}

interface MaxLengthConfig extends SampleConfig {
   max: number;
}

interface MaxLengthMethod {
   maxLength: MaxLengthConfig;
}

interface IsCapitalSymbolConfig extends SampleConfig {}

interface IsCapitalSymbolMethod {
   isCapitalSymbol: IsCapitalSymbolConfig;
}

interface IsDigitSymbolConfig extends SampleConfig {}

interface IsDigitSymbolMethod {
   isDigitSymbol: IsDigitSymbolConfig;
}

interface emailConfig extends SampleConfig {}

interface emailMethod {
   email: emailConfig;
}

export interface IValidationMethod
   extends RequiredMethod,
      LatinaAndNumericMethod,
      MinLengthMethod,
      MaxLengthMethod,
      IsCapitalSymbolMethod,
      IsDigitSymbolMethod,
      emailMethod {}

export type TInterfaceValue<I> = I[keyof I];

export type TValidationRule = keyof IValidationMethod;

export function isRequiredMethod(method: Partial<IValidationMethod>): method is RequiredMethod {
   return "isRequired" in method;
}

export function isLatinaAndNumericMethod(method: Partial<IValidationMethod>): method is LatinaAndNumericMethod {
   return "latinaAndNumeric" in method;
}

export function isMinLengthMethod(method: Partial<IValidationMethod>): method is MinLengthMethod {
   return "minLength" in method;
}

export function isMaxLengthMethod(method: Partial<IValidationMethod>): method is MaxLengthMethod {
   return "maxLength" in method;
}

export function isCapitalSymbolMethod(method: Partial<IValidationMethod>): method is IsCapitalSymbolMethod {
   return "isCapitalSymbol" in method;
}

export function isDigitSymbolMethod(method: Partial<IValidationMethod>): method is IsDigitSymbolMethod {
   return "isDigitSymbol" in method;
}

export function isEmailMethod(method: Partial<IValidationMethod>): method is emailMethod {
   return "email" in method;
}
