export function serialize<T>(data: T) {
  return JSON.parse(JSON.stringify(data)) as serialize.Serialized<T>;
}

export namespace serialize {

  export type Serialized<T> =
    T extends Date | Function ? string :
    T extends undefined ? never :
    T extends Array<any> ? Array<Serialized<T[number]>> :
    T extends object ? { [K in keyof T]: Serialized<T[K]> } :
    T;

}