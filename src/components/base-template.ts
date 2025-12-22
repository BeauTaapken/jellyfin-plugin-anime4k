export abstract class BaseTemplate {
  constructor(
    private id: string,
    private container: Element = document.body,
  ) {}

  public render(): Element | undefined {
    if (this.container.querySelector(`#${this.id}`)) return;

    const template = document.createElement('template');
    template.innerHTML = this.getTemplate().trim();
    return template.content.firstElementChild || undefined;
  }

  abstract getTemplate(): string;
}
