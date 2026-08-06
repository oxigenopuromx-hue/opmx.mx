/**
 * DATO DEMO — NO ES UN ESTUDIO REAL DE OPMX.
 *
 * Contenido tipado, versionado en el repositorio y tratado como
 * inmutable (BLUEPRINT_v1.1.md §1, precisión 1 de la autorización de
 * Fase 1: sin base de datos todavía). Corresponde al material de
 * referencia histórico proporcionado para la demostración de interfaz
 * de Michoacán (OPMX MASTER SPEC v1.0, Sección 11).
 *
 * Reglas aplicadas, sin excepción:
 * - Las cifras no se alteran ni se completan bajo ninguna circunstancia.
 * - El total de `results` se calcula a partir de los datos reales (no se
 *   escribe a mano) precisamente para no poder "arreglar" silenciosamente
 *   la discrepancia si alguien edita este archivo en el futuro.
 * - Esta demostración no se presenta como una investigación producida,
 *   auditada o metodológicamente respaldada por OPMX.
 */

export const michoacanGubernaturaDemo = {
  kind: "demo",
  contentVersion: 1,
  slug: "michoacan-gubernatura-junio-2026",
  label: "ESTUDIO DEMO / LEVANTAMIENTO DEL 04 AL 10 DE JUNIO DE 2026",
  title: "Encuesta de opinión pública en el estado de Michoacán",
  topic: "Preferencia electoral para Gobernador de Michoacán",
  question:
    "Si hoy fueran las elecciones para elegir Gobernador(a) de Michoacán, ¿por cuál partido votaría usted?",
  fieldwork: {
    start: "2026-06-04",
    end: "2026-06-10",
  },
  population:
    "Adultos, hombres y mujeres de 18 años y más que residen permanentemente en viviendas particulares en el estado de Michoacán.",
  technique:
    "Entrevistas personales cara a cara en vivienda, mediante cuestionario estructurado aplicado por encuestadores en dispositivos electrónicos.",
  coverage: "Representativa a nivel estatal.",
  sampleSizeEffective: 1200,
  confidenceLevel: 95,
  marginOfErrorPercentagePoints: 3.23,
  designEffect: 1.3,
  results: [
    { option: "MORENA", percentage: 40 },
    { option: "PAN", percentage: 20 },
    { option: "PRI", percentage: 10 },
    { option: "Partido Verde", percentage: 8 },
    { option: "Michoacán", percentage: 6 },
    { option: "Partido del Trabajo", percentage: 5 },
    { option: "Movimiento Ciudadano", percentage: 3 },
    { option: "No respuesta", percentage: 3 },
    { option: "PRD", percentage: 2 },
  ],
} as const;

export const demoResultsTotalPercentage = michoacanGubernaturaDemo.results.reduce(
  (total, item) => total + item.percentage,
  0,
);
