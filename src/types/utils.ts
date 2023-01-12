export type StringReplace<TString extends string, TTarget extends string, TReplacer extends string> =
  TString extends `${infer S1 extends string}${TTarget}${infer S2 extends string | never}`
    ? `${S1}${TReplacer}${StringReplace<S2, TTarget, TReplacer>}`
    : TString;

export type StringReplaceLeading<TString extends string, TTarget extends string, TReplacer extends string> =
  TString extends `${TTarget}${infer S}`
    ? `${TReplacer}${S}`
    : TString;