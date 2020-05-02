export class ConfirmationDialogParams {
  constructor(
    public title: string,
    public question: string,
    public confirmed: () => void,
    public canceled?: () => void,
  ) {

  }
}
