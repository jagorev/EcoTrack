/**
 * Classe semplice per rappresentare coordinate geografiche in formato gradi, primi, secondi
 */
class Posizione {
  /**
   * @param {number} latitudineGradi - Gradi di latitudine
   * @param {number} latitudinePrimi - Primi di latitudine
   * @param {number} latitudineSecondi - Secondi di latitudine
   * @param {number} longitudineGradi - Gradi di longitudine
   * @param {number} longitudinePrimi - Primi di longitudine
   * @param {number} longitudineSecondi - Secondi di longitudine
   */
  constructor(
    latitudineGradi, 
    latitudinePrimi, 
    latitudineSecondi, 
    longitudineGradi, 
    longitudinePrimi, 
    longitudineSecondi
  ) {
    this.latitudineGradi = latitudineGradi;
    this.latitudinePrimi = latitudinePrimi;
    this.latitudineSecondi = latitudineSecondi;
    this.longitudineGradi = longitudineGradi;
    this.longitudinePrimi = longitudinePrimi;
    this.longitudineSecondi = longitudineSecondi;
  }
}

module.exports = Posizione;
