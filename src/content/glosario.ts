export type GlossaryTerm = {
  term: string;
  definition: string;
};

/**
 * Glosario metodológico (Master Spec §62). Definiciones técnicas de uso
 * general en demoscopia, no específicas de un estudio de OPMX. Lista
 * inicial parcial para Fase 1; se amplía en fases posteriores.
 */
export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Encuesta",
    definition:
      "Estudio que mide opiniones, actitudes o comportamientos de una población mediante la aplicación de un cuestionario a una muestra representativa de esa población.",
  },
  {
    term: "Muestra",
    definition:
      "Subconjunto de la población objetivo del que efectivamente se recopila información, seleccionado para representar al conjunto total con un método definido.",
  },
  {
    term: "Margen de error",
    definition:
      "Rango dentro del cual se espera que se ubique el valor real de la población, dado un nivel de confianza estadística determinado. Depende del tamaño de muestra, el diseño muestral y el efecto de diseño.",
  },
  {
    term: "Confianza estadística",
    definition:
      "Probabilidad de que el intervalo calculado a partir de la muestra contenga el valor real de la población si el estudio se repitiera bajo las mismas condiciones. Comúnmente expresada como 95%.",
  },
  {
    term: "Muestreo probabilístico",
    definition:
      "Método de selección de muestra en el que cada unidad de la población tiene una probabilidad conocida y distinta de cero de ser seleccionada, lo que permite calcular formalmente el margen de error.",
  },
  {
    term: "Muestreo polietápico",
    definition:
      "Diseño muestral que selecciona la muestra en varias etapas sucesivas (por ejemplo, sección electoral, punto de arranque, vivienda y persona dentro del hogar), en lugar de seleccionar directamente a los individuos finales.",
  },
  {
    term: "Ponderación",
    definition:
      "Ajuste estadístico aplicado a los datos recolectados para que la distribución de la muestra se aproxime a la distribución conocida de la población en variables relevantes (como sexo, edad o escolaridad).",
  },
  {
    term: "Raking (ajuste iterativo proporcional)",
    definition:
      "Técnica de ponderación que ajusta iterativamente los pesos de la muestra para que coincidan simultáneamente con varias distribuciones marginales conocidas de la población.",
  },
  {
    term: "Efecto de diseño",
    definition:
      "Factor que mide cuánto aumenta la varianza de una estimación por usar un diseño muestral complejo (por etapas, con ponderación) en lugar de un muestreo aleatorio simple. Un efecto de diseño mayor a 1 amplía el margen de error real.",
  },
  {
    term: "Sección electoral",
    definition:
      "Unidad geográfica básica de organización territorial para fines electorales en México, utilizada frecuentemente como unidad primaria de muestreo en estudios de opinión con cobertura estatal o nacional.",
  },
];
