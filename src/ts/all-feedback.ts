import { TBInitIframe } from '@taskbuddy/add-on'
TBInitIframe('c5ndeu59aacjmf4ksd30', 'modal-web-view', async (tbapi) => {
  return tbapi.activeUser().then((user) => {
    tbapi.getStorage('account', user.account_id, 'job-reviews', 'all').then((data) => {
      if (!data) return
      const rCont = document.getElementById('container')
      data.reviewedJobs.forEach((rj) => {
        const reviewCont = document.createElement('div')
        reviewCont.className = 'reviewcontainer'
        const job = document.createElement('p')
        job.textContent = 'The job "' + rj.id + '" was rated '
        tbapi.getJob(rj.id).then((j) => {
          job.textContent = 'The job "' + j.name + '" was rated '
        })
        const rating = document.createElement('img')
        rating.src = 'https://taskbuddy-add-on-example.netlify.app/' + rj.rating + '.png'
        rating.style.height = '2rem;'
        const userInfo = document.createElement('p')
        userInfo.textContent = ' by user "' + rj.u_id + '"'
        tbapi.getUser(rj.u_id).then((u) => {
          userInfo.textContent = ' by user "' + u.given_name + ' ' + u.family_name + '"'
        })
        const moreBtn = document.createElement('a')
        moreBtn.textContent = 'See review'
        moreBtn.onclick = () => {
          reviewCont.removeChild(moreBtn)
          const moreDiv = document.createElement('div')
          moreDiv.className = 'morediv'
          const title = document.createElement('p')
          const desc = document.createElement('p')
          tbapi.getStorage('job', rj.id, 'job-review', 'all').then((jobreview) => {
            title.textContent = jobreview.title
            desc.textContent = jobreview.description
          })
          moreDiv.appendChild(title)
          moreDiv.appendChild(desc)
          reviewCont.appendChild(moreDiv)
        }
        reviewCont.appendChild(job)
        reviewCont.appendChild(rating)
        reviewCont.appendChild(userInfo)
        reviewCont.appendChild(moreBtn)
        rCont?.appendChild(reviewCont)
      })
    })
  })
})
