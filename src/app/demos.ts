export class demos {
  id: string;
  demo: {
    category: string;
    demo: { name: string; place: string; url: string };
  };

  constructor(
    id: string,
    demo: {
      category: string;
      demo: { name: string; place: string; url: string };
    }
  ) {
    this.id = id;
    this.demo = demo;
  }
  toString() {
    return this.id + ',' + this.demo;
  }
}
