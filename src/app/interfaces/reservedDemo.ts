export class ReservedDemo {
  id: string;
  userName: string;
  cours: string;
  chapitre: string;
  demo: { name: string; place: string; material: string; url: string };

  constructor(
    id: string,
    userName: string,
    cours: string,
    chapitre: string,
    demo: { name: string; place: string; material: string; url: string }
  ) {
    this.id = id;
    this.userName = userName;
    this.cours = cours;
    this.chapitre = chapitre;
    this.demo = demo;
  }
  toString() {
    return this.id + ',' + this.demo;
  }
}
