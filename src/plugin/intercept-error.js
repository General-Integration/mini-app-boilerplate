function interceptError($fetch) {
  $fetch.handleError((error) => {
    console.log('error: ', error)
    alert('alert from global error handler')
  })
}

export default interceptError
