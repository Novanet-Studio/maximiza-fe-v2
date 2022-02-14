/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */


export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Hay nuevo contenido disponible en la aplicación. ` +
      `¿Deseas actualizar para ver la ultima versión?`
  )
  if (answer === true) {
    window.location.reload()
  }
}
