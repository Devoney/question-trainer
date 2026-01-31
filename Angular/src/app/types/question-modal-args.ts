export class QuestionModalArgs {
  constructor(
    public title: string,
    public text: string,
    public okHandler: () => void,
    public okButtonText: string = 'Ok',
    public cancelButtonText: string = 'Cancel',
    public cancelHandler: (() => void) | undefined = undefined
  ) {}
}
