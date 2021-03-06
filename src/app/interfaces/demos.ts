export class demos {
  id: string;

  cours: string;
  chapitre: string;
  demo: { name: string; place: string; material: string; url: string };

  constructor(
    id: string,
    cours: string,
    chapitre: string,
    demo: { name: string; place: string; material: string; url: string }
  ) {
    this.id = id;
    this.cours = cours;
    this.chapitre = chapitre;
    this.demo = demo;
  }
  toString() {
    return this.id + ',' + this.demo;
  }
}
