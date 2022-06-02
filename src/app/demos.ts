export class demos {
  id: string;
  demo: {
    cours: string;
    chapitre: string;
    demo: { name: string; place: string; material: string; url: string };
  };

  constructor(
    id: string,
    demo: {
      cours: string;
      chapitre: string;
      demo: { name: string; place: string; material: string; url: string };
    }
  ) {
    this.id = id;
    this.demo = demo;
  }
  toString() {
    return this.id + ',' + this.demo;
  }
}
