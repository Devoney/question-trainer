export default class ObjectExt {
  public static clone<T>(object: T): T {
    return JSON.parse(JSON.stringify(object)) as T;
  }
}
