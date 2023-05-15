export interface IDoc {
  data: Data;
}
export interface Data {
  __schema: Schema;
}
export interface Schema {
  queryType: QueryType;
  mutationType?: null;
  subscriptionType?: null;
  types?: TypesEntity[] | null;
  directives?: DirectivesEntity[] | null;
}
export interface QueryType {
  name: string;
}
export interface TypesEntity {
  kind: string;
  name: string;
  description?: string | null;
  fields?: FieldsEntity[] | null;
  inputFields?: InputFieldsEntity[] | null;
  interfaces?: null[] | null;
  enumValues?: EnumValuesEntity[] | null;
  possibleTypes?: null;
}
export interface FieldsEntity {
  name: string;
  description?: string | null;
  args?: (ArgsEntity | null)[] | null;
  type: Type;
  isDeprecated: boolean;
  deprecationReason?: null;
}
export interface ArgsEntity {
  name: string;
  description?: null;
  type: TypeOrOfType;
  defaultValue?: string | null;
}
export interface TypeOrOfType {
  kind: string;
  name?: string | null;
  ofType?: OfTypeOrType | null;
}
export interface OfTypeOrType {
  kind: string;
  name: string;
  ofType?: null;
}
export interface Type {
  kind: string;
  name?: string | null;
  ofType?: TypeOrOfType1 | null;
}
export interface TypeOrOfType1 {
  kind: string;
  name?: string | null;
  ofType?: TypeOrOfType2 | null;
}
export interface TypeOrOfType2 {
  kind: string;
  name?: string | null;
  ofType?: OfTypeOrType | null;
}
export interface InputFieldsEntity {
  name: string;
  description?: null;
  type: OfTypeOrType1;
  defaultValue?: null;
}
export interface OfTypeOrType1 {
  kind: string;
  name?: string | null;
  ofType?: TypeOrOfType3 | null;
}
export interface TypeOrOfType3 {
  kind: string;
  name?: null;
  ofType: OfTypeOrType2;
}
export interface OfTypeOrType2 {
  kind: string;
  name: string;
  ofType?: null;
}
export interface EnumValuesEntity {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason?: null;
}
export interface DirectivesEntity {
  name: string;
  description: string;
  locations?: string[] | null;
  args?: ArgsEntity1[] | null;
}
export interface ArgsEntity1 {
  name: string;
  description: string;
  type: TypeOrOfType;
  defaultValue?: string | null;
}
