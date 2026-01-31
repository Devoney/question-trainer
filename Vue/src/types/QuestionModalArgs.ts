export default class QuestionModalArgs {
  constructor(
    public title: string,
    public text: string,
    public okHandler: () => void,
    public okButtonText: string = 'Ok',
    public cancelButtonText: string = 'Cancel',
    /* tslint:disable */
    public cancelHandler: (() => void) | undefined = undefined,
    /* tslint:enable */
  ) {

  }
}
