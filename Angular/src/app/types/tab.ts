export class Tab {
  constructor(
    public title: string,
    public component: string,
    public props: Record<string, unknown> = {}
  ) {}
}
