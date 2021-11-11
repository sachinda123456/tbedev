import { TBInitIframe } from '@taskbuddy/add-on'
TBInitIframe('c5ndeu59aacjmf4ksd30', 'modal-web-view', async (tbapi) => {
  const res = await tbapi.activeJob()
  const user = await tbapi.activeUser()

  document.getElementById('jobname')!.textContent = res.name

  try {
    const obj = await tbapi.getStorage('job', res.id, 'job-review', 'all')
    ;(document.getElementById('title')! as HTMLInputElement).value = obj.title(
      document.getElementById('description')! as HTMLInputElement
    ).value = obj.description

    const rating = document.getElementsByName('rate') as unknown as HTMLInputElement[]
    if (obj.rating !== undefined) {
      for (let i = 0; i < rating.length; i++) {
        if (rating[i].value === '' + obj.rating) rating[i].checked = true
      }
    }
  } catch (err) {}

  window['submit'] = () => {}

  if (user.user_type === 'client') {
    const submit = () => {
      const title = (document.getElementById('title') as HTMLInputElement).value
      const description = (document.getElementById('description') as HTMLInputElement).value
      const rating = document.getElementsByName('rate') as unknown as HTMLInputElement[]
      let nRating: undefined | number = undefined
      for (let i = 0; i < rating.length; i++) {
        if (rating[i].checked) nRating = Number.parseInt(rating[i].value)
      }
      let rMess = ''
      for (let i = 0; nRating && i < nRating; i++) {
        rMess += '⭐'
      }
      tbapi
        .setStorage('job', res.id, 'job-review', 'all', {
          title,
          description,
          rating: nRating,
        })
        .then(() => tbapi.getStorage('account', res.account_id, 'job-reviews', 'all'))
        .catch(() => {
          return {
            reviewedJobs: [],
          }
        })
        .then((accData) => {
          const idx = accData.reviewedJobs.findIndex((rj) => rj.id === res.id)
          if (idx >= 0) {
            accData.reviewedJobs[idx].rating = nRating
            accData.reviewedJobs[idx].u_id = user.id
          } else {
            accData.reviewedJobs = [
              ...accData.reviewedJobs,
              { id: res.id, rating: nRating, u_id: user.id },
            ]
          }
          return tbapi.setStorage('account', res.account_id, 'job-reviews', 'all', accData)
        })
        .then(() => tbapi.postInChat(res.channel_id, 'Rated job ' + rMess + ', ' + title))
        .then(() => tbapi.closeWebView())
    }
    const inputs = document.getElementsByTagName('input')
    const inputList = Array.prototype.slice.call(inputs)
    inputList.forEach((element) => {
      element.disabled = false
    })
    const texts = document.getElementsByTagName('textarea')
    const textList = Array.prototype.slice.call(texts)
    textList.forEach((element) => {
      element.disabled = false
    })
    window['submit'] = submit
  } else {
    document.getElementById('submit-btn')!.style.display = 'none'
  }
})
