/**
 * Simula uma latência de carregamento usando setTimeout
 * @param delay - Tempo de delay em milissegundos
 * @returns Promise que resolve após o delay especificado
 */
export const simulateDelay = (delay: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}
