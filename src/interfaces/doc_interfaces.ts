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
  types: TypesEntity[];
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
  // isDeprecated: boolean;
  deprecationReason?: null;
}
export interface ArgsEntity {
  name: string;
  description?: null;
  type: Type;
  defaultValue?: string | null;
}

export interface Type {
  kind: string;
  name?: string | null;
  ofType?: Type | null;
}

export interface InputFieldsEntity {
  name: string;
  description?: null;
  type: Type;
  defaultValue?: null;
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
  type: Type;
  defaultValue?: string | null;
}
